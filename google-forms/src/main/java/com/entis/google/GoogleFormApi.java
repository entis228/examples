package com.entis.google;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.Permission;
import com.google.api.services.drive.model.PermissionList;
import com.google.api.services.forms.v1.Forms;
import com.google.api.services.forms.v1.FormsScopes;
import com.google.api.services.forms.v1.model.BatchUpdateFormRequest;
import com.google.api.services.forms.v1.model.Form;
import com.google.api.services.forms.v1.model.ListFormResponsesResponse;
import com.google.auth.oauth2.GoogleCredentials;
import java.io.ByteArrayInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;

public class GoogleFormApi {

    private static final String APPLICATION_NAME = "test-google-form-service";
    private static final Drive driveService;
    private static final Forms formsService;

    static {
        try {
            JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();

            driveService = new Drive.Builder(GoogleNetHttpTransport.newTrustedTransport(),
                jsonFactory, null)
                .setApplicationName(APPLICATION_NAME).build();

            formsService = new Forms.Builder(GoogleNetHttpTransport.newTrustedTransport(),
                jsonFactory, null)
                .setApplicationName(APPLICATION_NAME).build();
        } catch (GeneralSecurityException | IOException e) {
            throw new RuntimeException(e);
        }
    }

    public Form createForm(Form form) {
        try {
            String token = getAccessToken();
            return formsService.forms().create(form)
                .setAccessToken(token)
                .execute();
        } catch (IOException e) {
            throw new RuntimeException("Error while creating form: " + e.getMessage());
        }
    }

    public boolean publishForm(String formId) {
        try {
            String accessToken = getAccessToken();
            PermissionList listOfPermissions = driveService.permissions().list(formId)
                .setOauthToken(accessToken)
                .execute();

            if (listOfPermissions.getPermissions().stream()
                .noneMatch(permission -> permission.getRole().equals("reader"))) {
                Permission permission = new Permission();
                permission.setRole("reader");
                permission.setType("anyone");
                driveService.permissions().create(formId, permission)
                    .setOauthToken(accessToken)
                    .execute();
            }

            return true;
        } catch (IOException e) {
            throw new RuntimeException("Error while publishing form: " + e.getMessage());
        }
    }

    public void sendRequestForUpdate(String formId, BatchUpdateFormRequest batchRequest) {
        try {
            String token = getAccessToken();
            formsService.forms().batchUpdate(formId, batchRequest)
                .setAccessToken(token).execute();
        } catch (IOException e) {
            throw new RuntimeException("Error while updating form: " + e.getMessage());
        }
    }

    public ListFormResponsesResponse readResponses(String formId) {
        try {
            String token = getAccessToken();
            return formsService.forms().responses().list(formId)
                .setOauthToken(token).execute();
        } catch (IOException e) {
            throw new RuntimeException("Error while reading responses: " + e.getMessage());
        }
    }

    public Form getForm(String formId) {
        try {
            String token = getAccessToken();
            return formsService.forms().get(formId).setAccessToken(token).execute();
        } catch (IOException e) {
            throw new RuntimeException("Error while getting form: " + e.getMessage());
        }
    }

    private String getAccessToken() throws IOException {
        GoogleCredentials credential = GoogleCredentials
            .fromStream(new ByteArrayInputStream(getCredentialsFileContent("src/main/resources/creds.json")))
            .createScoped(FormsScopes.all());
        return credential.getAccessToken() != null ?
            credential.getAccessToken().getTokenValue() :
            credential.refreshAccessToken().getTokenValue();
    }

    private byte[] getCredentialsFileContent(String filePath) {
        try {
            return Files.readAllBytes(Paths.get(filePath));
        } catch (IOException firstException) {
            // This is due to FileNotFoundException when run in Docker
            try (InputStream inputStream = this.getClass().getResourceAsStream(
                filePath.replaceFirst("src/main/resources/", "/"))) {
                if (inputStream == null) {
                    throw new FileNotFoundException("File %s not found".formatted(filePath));
                }
                return inputStream.readAllBytes();
            } catch (IOException secondException) {
                StringWriter stringWriter = new StringWriter();
                firstException.printStackTrace(new PrintWriter(stringWriter));
                System.out.printf(
                    """
                        Tried 2 times to find file %s and unsuccessfully. \n
                        The first attempt: %s \n
                        The second attempt: \n
                        """, filePath, stringWriter);
                throw new UncheckedIOException("Failed to read file.", secondException);
            }
        }
    }
}
