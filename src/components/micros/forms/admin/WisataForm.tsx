import Produk, {
  jenisPaket,
  jenisPaketData,
  pax,
  wisataPilihan,
} from "@/interfaces/produkInterface";
import { reduxState } from "@/interfaces/reduxInterface";
import { Button, Input, Textarea, Tooltip } from "@material-tailwind/react";
import { ErrorMessage, FieldArray, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const WisataForm = (props: any) => {
  const dataWisataPilihan: wisataPilihan | undefined | null = useSelector(
      (state: reduxState) => state.produk.selectedDataWisata
    ),
    { setFieldValue, touched, isSubmitting, errors, values, resetForm }: any =
      useFormikContext(),
    dispatch = useDispatch();

  useEffect(() => {
    if (dataWisataPilihan) {
      setFieldValue("fasilitas", dataWisataPilihan.fasilitas);
      setFieldValue("jenisPaket", dataWisataPilihan.jenisPaket);
      setFieldValue("nama", dataWisataPilihan.namaPaket);
      setFieldValue("fetchType", "update");
      console.log("jalan");
    }
  }, [dataWisataPilihan]);

  return (
    <div className="space-y-5">
      {dataWisataPilihan && (
        <div className="bg-white shadow-xl rounded-lg px-3 py-2 uppercase text-center font-normal">
          <span className="bg-red-400 rounded-md px-2 text-white mx-1">
            update
          </span>
          Id - {dataWisataPilihan._id}
        </div>
      )}
      <Input
        variant="outlined"
        color="orange"
        size="lg"
        label={`${errors.nama && touched.nama ? errors.nama : "Nama Paket"}`}
        onChange={(e) => {
          setFieldValue("nama", e.target.value);
        }}
        value={values.nama ?? ""}
        error={errors.nama && touched.nama ? true : false}
      />
      <Textarea
        variant="outlined"
        color="orange"
        size="lg"
        value={values?.fasilitas.join(",") ?? ""}
        label={`${
          errors.fasilitas && touched.fasilitas ? errors.fasilitas : "Fasilitas"
        }`}
        onChange={(e) => {
          setFieldValue("fasilitas", e.target.value.split(","));
        }}
        error={errors.fasilitas && touched.fasilitas ? true : false}
      />
      <h3 className="text-2xl font-semibold">Jenis Paket</h3>
      <FieldArray
        name="jenisPaket"
        render={(arrayHelpers) => (
          <div
            className={`md:pl-5 md:ml-5 md:border-l-2 grid 2xl:grid-cols-2 grid-cols-1 gap-5 border-gray-600`}
          >
            {values.jenisPaket && values.jenisPaket.length > 0 ? (
              values.jenisPaket.map((jenisPaket: jenisPaket, index: number) => (
                <div
                  key={index}
                  className="p-3 rounded-xl bg-gray-100 transition-all duration-300 space-y-3"
                >
                  <div className="flex items-center gap-2 justify-end md:justify-between flex-wrap pb-3">
                    <h3 className="text-gray-400 text-2xl font-medium">
                      Data ke-{index + 1}
                    </h3>
                    <div className="space-x-3">
                      <Tooltip
                        content="Hapus data ini"
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                        className="bg-white text-gray-700 shadow-xl"
                      >
                        <Button
                          disabled={values.jenisPaket.length < 2}
                          onClick={() => arrayHelpers.remove(index)}
                          className="p-2 rounded-full"
                          color="red"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 aspect-square"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </Button>
                      </Tooltip>
                      <Tooltip
                        content="Tambah data setelah data ini"
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                        className="bg-white text-gray-700 shadow-xl"
                      >
                        <Button
                          color="green"
                          onClick={() =>
                            arrayHelpers.insert(index + 1, jenisPaketData)
                          }
                          className="p-2 rounded-full"
                        >
                          <div className="h-6 flex items-center normal-case text-sm font-medium mx-2 gap-2">
                            Tambah setelah ini
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 aspect-square"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                              />
                            </svg>
                          </div>
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                  <Input
                    variant="outlined"
                    color="orange"
                    size="lg"
                    label={"Tempat Wisata"}
                    value={
                      values?.jenisPaket[index].tempatWisata?.join(",") ?? ""
                    }
                    onChange={(e) => {
                      setFieldValue(
                        `jenisPaket.${index}.tempatWisata`,
                        e.target.value.split(",")
                      );
                    }}
                  />
                  <div className="text-xs text-red-400 font-normal border-l-2 border-l-red-400 ml-3 pl-2">
                    <ErrorMessage name={`jenisPaket.${index}.tempatWisata`} />
                  </div>
                  <Textarea
                    variant="outlined"
                    color="orange"
                    size="lg"
                    label="Rundown"
                    value={values?.jenisPaket[index].rundown?.join(",") ?? ""}
                    onChange={(e) => {
                      setFieldValue(
                        `jenisPaket.${index}.rundown`,
                        e.target.value.split(",")
                      );
                    }}
                  />
                  <div className="text-xs text-red-400 font-normal border-l-2 border-l-red-400 ml-3 pl-2">
                    <ErrorMessage name={`jenisPaket.${index}.rundown`} />
                  </div>
                  <h3 className="text-xl font-medium text-gray-400">Pax</h3>
                  <FieldArray
                    name={`jenisPaket.${index}.pax`}
                    render={(arrayHelpersPax) => (
                      <div className="border border-blue-gray-200 space-y-3 rounded-md px-3 py-2">
                        {values.jenisPaket[index].pax.map(
                          (pax: pax, paxIndex: number) => (
                            <div key={paxIndex} className="w-full space-y-2">
                              <div className="space-x-1 flex flex-nowrap justify-end">
                                <Tooltip
                                  content={"Hapus data ini"}
                                  animate={{
                                    mount: { scale: 1, y: 0 },
                                    unmount: { scale: 0, y: 25 },
                                  }}
                                  className="bg-white text-gray-700 shadow-xl"
                                >
                                  <Button
                                    disabled={
                                      values.jenisPaket[index].pax.length < 2
                                    }
                                    onClick={() =>
                                      values.jenisPaket[index].pax.length > 1 &&
                                      arrayHelpersPax.remove(paxIndex)
                                    }
                                    className="p-2 rounded-full"
                                    color="red"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-6 aspect-square"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                      />
                                    </svg>
                                  </Button>
                                </Tooltip>
                                <Tooltip
                                  content="Tambah data setelah data ini"
                                  animate={{
                                    mount: { scale: 1, y: 0 },
                                    unmount: { scale: 0, y: 25 },
                                  }}
                                  className="bg-white text-gray-700 shadow-xl"
                                >
                                  <Button
                                    color="green"
                                    onClick={() =>
                                      arrayHelpersPax.insert(paxIndex, pax)
                                    }
                                    className="p-2 rounded-full"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-6 aspect-square"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                                      />
                                    </svg>
                                  </Button>
                                </Tooltip>
                              </div>
                              <div className="flex justify-start items-center gap-3 flex-wrap">
                                <Input
                                  variant="outlined"
                                  color="orange"
                                  size="lg"
                                  label="Jumlah Orang"
                                  type="number"
                                  value={
                                    values?.jenisPaket[index].pax[paxIndex]
                                      .jumlah ?? ""
                                  }
                                  onChange={(e) =>
                                    setFieldValue(
                                      `jenisPaket.${index}.pax.${paxIndex}.jumlah`,
                                      Number(e.target.value)
                                    )
                                  }
                                />
                                <Input
                                  variant="outlined"
                                  color="orange"
                                  size="lg"
                                  label="Harga"
                                  type="number"
                                  value={
                                    values?.jenisPaket[index].pax[paxIndex]
                                      .harga ?? ""
                                  }
                                  onChange={(e) =>
                                    setFieldValue(
                                      `jenisPaket.${index}.pax.${paxIndex}.harga`,
                                      Number(e.target.value)
                                    )
                                  }
                                />
                                <h3 className="bg-red-400 h-10 flex justify-center items-center text-white aspect-square  font-bold text-xl rounded-md">
                                  {paxIndex + 1}
                                </h3>
                                <div className="text-xs text-red-400 font-normal border-l-2 border-l-red-400 ml-3 pl-2">
                                  <ErrorMessage
                                    name={`jenisPaket.${index}.pax.${paxIndex}.jumlah`}
                                  />
                                  <ErrorMessage
                                    name={`jenisPaket.${index}.pax.${paxIndex}.harga`}
                                  />
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  />
                </div>
              ))
            ) : (
              <Button
                type="button"
                color="green"
                onClick={() => {
                  console.log(errors);
                  arrayHelpers.push(jenisPaketData);
                }}
              >
                Tambah Jenis Paket
              </Button>
            )}
          </div>
        )}
      />
      <div className="flex gap-3 justify-end">
        <Button
          color="red"
          variant="text"
          onClick={() => {
            dispatch({ type: "produk/setSelectedDataWisata", payload: null });
            resetForm();
          }}
          // disabled={!values ? true : false}
        >
          Bersihkan Form
        </Button>
        <Button
          color="green"
          onClick={() => {
            console.log(errors);
          }}
          type="submit"
          disabled={isSubmitting}
        >
          {dataWisataPilihan ? "Update Wisata" : "Tambah Wisata"}
        </Button>
      </div>
    </div>
  );
};

export default WisataForm;
