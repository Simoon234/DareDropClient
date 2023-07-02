import * as Yup from "yup";

const validationSchema = Yup.object({
  streamerName: Yup.string()
    .min(3, "The given value is too short! (Min. 3 characters)")
    .max(50, "Too many characters!")
    .required("Please fill this field"),
  streamingPlatform: Yup.string().required("Please fill this field"),
  streamerDescription: Yup.string()
    .min(10, "The given value is too short! (Min. 10 characters)")
    .max(500, "Too many characters!")
    .required("Please fill this field"),
});

export default validationSchema;
