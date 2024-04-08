import { UploadButton } from "../utils/uploadthing";

export function ImageUploader() {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={res => {
        // Do something with the response
        const inputElement =
          document.querySelector<HTMLInputElement>("#img-url");
        if (inputElement) {
          console.log(inputElement, res[0].url);
          inputElement.value = res[0].url;
        }
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
