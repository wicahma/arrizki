import { Form, Formik } from "formik";
import Layout from "../components/Layout";
import TextHeader from "@/components/TextHeader/main";
import * as Yup from "yup";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { setAlert, setLoading } from "@/store/mainSlice";
import axios from "axios";
const Kontak = () => {
  const dispatch = useDispatch();
  return (
    <Layout pageTitle="Kontak">
      <div className="pt-14 container mx-auto">
        <TextHeader className="mt-10" title="Kontak Kami" />
        <div className="lg:w-[80%] w-full mx-auto space-y-5 px-2">
          <p>
            Silahkan Sampaikan Masukan/Saran, Pertanyaan, Atau Apa Saja Kepada
            Kami. Untuk menghubungi Tim Arrizki Tour silakan kirim pesan melalui
            isian di bawah ini. Isi nama, nomor telepon dan alamat email agar
            kami mudah menghubungi anda.
          </p>
          <Formik
            initialValues={{
              nama: "",
              email: "",
              noTelp: "",
              pesan: "",
            }}
            validationSchema={Yup.object().shape({
              nama: Yup.string()
                .required("Nama harus diisi")
                .max(100, "Nama tidak boleh lebih dari 100 karakter"),
              email: Yup.string()
                .email("Email tidak valid")
                .required("Email harus diisi")
                .max(100, "Email tidak boleh lebih dari 100 karakter"),
              noTelp: Yup.string()
                .required("No. Telp harus diisi")
                .test(
                  "must-start-with-08",
                  "Nomor Telepon harus dimulai dengan 08",
                  (value, context) =>
                    value?.toString().startsWith("08") ? true : false
                )
                .test(
                  "only-digits",
                  "Masukan Nomor telepon yang valid !",
                  (value) => (/^\d+$/g.test(value?.toString()) ? true : false)
                )
                .min(9, "Nomor telepon harus nimimal 9 digit !"),
              pesan: Yup.string()
                .required("Pesan harus diisi")
                .max(3000, "Pesan tidak boleh lebih dari 3000 karakter"),
            })}
            validateOnChange
            validateOnMount
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              dispatch(setLoading(true));
              await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact`, values).finally(() => {
                setSubmitting(false);
                dispatch(setLoading(false));
                dispatch(
                  setAlert({
                    show: true,
                    message: "Masukan anda berhasil dikirim!",
                    type: "success",
                  })
                );
              });
              return false;
            }}
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,
              setFieldValue,
              resetForm,
            }) => (
              <Form className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <Input
                    variant="outlined"
                    disabled={isSubmitting}
                    color="blue"
                    value={values.nama}
                    size="lg"
                    type="text"
                    label={`${
                      errors.nama && touched.nama ? errors.nama : "Nama"
                    }`}
                    onChange={(e) => {
                      setFieldValue("nama", e.target.value);
                    }}
                    error={errors.nama && touched.nama ? true : false}
                  />
                </div>
                <div className="lg:col-span-1 col-span-2">
                  <Input
                    variant="outlined"
                    disabled={isSubmitting}
                    color="blue"
                    size="lg"
                    value={values.email}
                    type="text"
                    label={`${
                      errors.email && touched.email ? errors.email : "Email"
                    }`}
                    onChange={(e) => {
                      setFieldValue("email", e.target.value);
                    }}
                    error={errors.email && touched.email ? true : false}
                  />
                  <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center gap-1 font-normal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="-mt-px h-4 w-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Pastikan Email anda aktif agar dapat kami hubungi kembali.
                  </Typography>
                </div>
                <div className="lg:col-span-1 col-span-2">
                  <Input
                    variant="outlined"
                    disabled={isSubmitting}
                    color="blue"
                    size="lg"
                    value={values.noTelp}
                    type="text"
                    label={`${
                      errors.noTelp && touched.noTelp
                        ? errors.noTelp
                        : "Nomor Telepon"
                    }`}
                    onChange={(e) => {
                      setFieldValue("noTelp", e.target.value);
                    }}
                    error={errors.noTelp && touched.noTelp ? true : false}
                  />
                  <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center gap-1 font-normal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="-mt-px h-4 w-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Pastikan nomor telepon anda aktif agar dapat kami hubungi kembali.
                  </Typography>
                </div>
                <div className="col-span-2">
                  <Textarea
                    variant="outlined"
                    disabled={isSubmitting}
                    color="blue"
                    value={values.pesan}
                    label={`${
                      errors.pesan && touched.pesan
                        ? errors.pesan
                        : "Pesan kamu ke Arrizki Tour buat kedepannya"
                    }`}
                    onChange={(e) => {
                      setFieldValue("pesan", e.target.value);
                    }}
                    error={errors.pesan && touched.pesan ? true : false}
                  />
                </div>
                <div className="flex gap-3 justify-end w-full col-span-2">
                  <Button
                    variant="text"
                    onClick={() => resetForm()}
                    disabled={isSubmitting}
                    color="red"
                  >
                    Bersihkan Form
                  </Button>
                  <Button type="submit" disabled={isSubmitting} color="green">
                    Kirim Pesan
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default Kontak;
