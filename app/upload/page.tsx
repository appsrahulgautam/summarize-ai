import UploadFormInput from "@/components/upload/upload-form-input";
import Uploadheader from "../../components/upload/uploadheader";
import UploadForm from "@/components/upload/upload-form";

const UploadPage = () => {
  return (
    <div className="flex flex-col justify-center">
      <Uploadheader />
      <UploadForm/>
    </div>
  );
};

export default UploadPage;
