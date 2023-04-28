import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Switch,
  Tooltip,
} from "@material-tailwind/react";
import Image from "next/image";
import React, { useEffect } from "react";
import MobilForm from "../micros/forms/admin/MobilForm";
import {
  mobilPilihan,
  reduxState,
  wisataPilihan,
} from "@/pages/admin/produk/produkInterface";
import { useFormikContext } from "formik";
import axios from "axios";
import Loading from "../micros/loading";
import { useDispatch, useSelector } from "react-redux";
import Alert, { AlertProps } from "../micros/alerts/Alert";

interface Table {
  identifier: string;
  tableTitle: string[];
  tableData: any[];
}

const ProductTable = (props: Table) => {
  const { tableTitle, tableData, identifier } = props,
    [handleOpenDelete, setHandleOpenDelete] = React.useState<boolean>(false),
    [handleOpenEditImage, setHandleOpenEditImage] =
      React.useState<boolean>(false),
    [selectedID, setSelectedID] = React.useState<string>(""),
    { values, setFieldValue }: any = useFormikContext(),
    [isLoading, setIsLoading] = React.useState<boolean>(false),
    dispatch = useDispatch(),
    produk = useSelector((state: reduxState) => state.produk),
    gambar = React.useRef<HTMLInputElement>(null),
    [alert, setAlert] = React.useState<AlertProps>({
      type: "error",
      message: "Anda berhasil login!",
      show: false,
    });

  useEffect(() => {
    if (alert.show === true) {
      setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 3000);
    }
  }, [alert.show]);

  const getDataProduk = async (data: any, identifier: string) => {
    setIsLoading(true);
    axios
      .get(`${process.env.API_URL}/api/v1/${identifier}/${data._id}`)
      .then((res) => {
        switch (identifier) {
          case "wisata":
            dispatch({
              type: "produk/setSelectedDataWisata",
              payload: res.data.data,
            });
            break;
          default:
            break;
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const updateStatus = (id: string, status: boolean) => {
    // alert(
    //   `Status berhasil di update | ${status ? "aktif" : "nonaktif"} | ${id}`
    // );
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    await axios
      .delete(`${process.env.API_URL}/api/v1/${identifier}/${id}`)
      .then(({ data, status }) => {
        setIsLoading(false);
        let state;
        switch (identifier) {
          case "wisata":
            state = "produk/setWisataState";
            break;
          case "car":
            state = "produk/setMobilState";
            break;
          default:
            break;
        }
        const newTableData = tableData.filter((data) => data._id !== id);
        dispatch({ type: state, payload: newTableData });
        setAlert({
          type: "success",
          message: data.message,
          show: true,
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setAlert({
          type: "error",
          message:
            err.response.data.message ||
            "Terjadi kesalahan, data gagal dihapus!",
          show: true,
        });
      });
  };

  const handleEditImage = (data: mobilPilihan | wisataPilihan | undefined) => {
    // alert("data gambar berhasil di update");
  };

  const handlePreviewPage = (data: any, identifier: string) => {
    switch (identifier) {
      case "wisata":
        window.open(
          `/paket-wisata/${data?.namaPaket}/${data?._id}/detail`,
          "_blank"
        );
        break;
      case "car":
        window.open(`/sewa-mobil`, "_blank");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Loading isActive={isLoading} />
      <Alert message={alert.message} show={alert.show} type={alert.type} />
      <table className="min-w-max bg-white font-sans shadow-md rounded-lg my-6 w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            {tableTitle.map((title, i) => (
              <th key={i} className="py-3 px-6 text-center">
                {title}
              </th>
            ))}
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {tableData.map((data: any, i) => (
            <tr
              key={i}
              className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
            >
              {Object.values(data).map(
                (value, ind): React.ReactNode => (
                  <td key={ind} className="py-3 px-6 text-left">
                    {String(value) === "aktif" ||
                    String(value) === "nonaktif" ? (
                      <Tooltip
                        content={"Ubah Status"}
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                        className="bg-white text-gray-700 shadow-xl"
                      >
                        <Switch
                          id={`switch-${i}-${ind}-${data._id}`}
                          defaultChecked={
                            String(value) === "aktif" ? true : false
                          }
                          onChange={(e) =>
                            updateStatus(data._id, e.target.checked)
                          }
                          label={
                            <span
                              className={`${
                                String(value) === "aktif"
                                  ? "bg-green-600"
                                  : "bg-red-600"
                              } text-white py-1 px-3 rounded-full text-xs`}
                            >
                              {String(value)}
                            </span>
                          }
                          color="green"
                        />
                      </Tooltip>
                    ) : (
                      <div className="flex items-center">
                        <span className="font-medium">{String(value)}</span>
                      </div>
                    )}
                  </td>
                )
              )}
              <td className="py-3 px-6 text-center">
                <div className="flex item-center bg-gray-300 space-x-2 px-3 py-1 rounded-full w-fit mx-auto justify-center">
                  {/* //NOTE - Lihat Preview */}
                  <Tooltip
                    content={"Lihat preview"}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                    className="bg-white text-gray-700 shadow-xl"
                  >
                    <div
                      onClick={() => handlePreviewPage(data, identifier)}
                      className="w-4 transform hover:text-red-500 hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                  </Tooltip>
                  {/* //NOTE - Edit Kolom */}
                  <Tooltip
                    content={"Edit Kolom ini"}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                    className="bg-white text-gray-700 shadow-xl"
                  >
                    <div
                      onClick={() => {
                        switch (identifier) {
                          case "car":
                            dispatch({
                              type: "produk/setSelectedDataMobil",
                              payload: data,
                            });
                            break;
                          case "wisata":
                            getDataProduk(data, identifier);
                            break;
                          default:
                            break;
                        }
                      }}
                      className="w-4 transform hover:text-red-500 hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </div>
                  </Tooltip>
                  {/* //NOTE - Update Gambar */}
                  <Tooltip
                    content={"Update Gambar"}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                    className="bg-white text-gray-700 shadow-xl"
                  >
                    <div
                      onClick={() => {
                        switch (identifier) {
                          case "car":
                            dispatch({
                              type: "produk/setSelectedDataMobil",
                              payload: data,
                            });
                            break;
                          case "wisata":
                            break;
                          default:
                            break;
                        }
                        setHandleOpenEditImage(!handleOpenEditImage);
                      }}
                      className="w-4 transform hover:text-red-500 hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-4 aspect-square"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                    </div>
                  </Tooltip>
                  {/* //NOTE - Hapus Data */}
                  <Tooltip
                    content={"Hapus data kolom ini"}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                    className="bg-white text-gray-700 shadow-xl"
                  >
                    <div
                      onClick={() => {
                        setSelectedID(data._id);
                        setHandleOpenDelete(true);
                      }}
                      className="w-4 transform hover:text-red-500 hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </div>
                  </Tooltip>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* NOTE - Dialog Delete Data */}
      <Dialog
        open={handleOpenDelete}
        size={"xs"}
        handler={() => setHandleOpenDelete(!handleOpenDelete)}
      >
        <DialogHeader>Hapus data?.</DialogHeader>
        <DialogBody divider>
          Anda yakin ingin menghapus data dengan ID {selectedID}?. Kegiatan ini
          tidak dapat diundur kembali
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setHandleOpenDelete(!handleOpenDelete)}
            className="mr-1"
          >
            <span>Batal hapus</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              setHandleOpenDelete(!handleOpenDelete);
              handleDelete(selectedID);
            }}
          >
            <span>Ya, hapus data</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* NOTE - Dialog Update Image */}
      <Dialog
        open={handleOpenEditImage}
        size={"xs"}
        handler={() => setHandleOpenEditImage(!handleOpenEditImage)}
      >
        <DialogHeader>Update Gambar.</DialogHeader>
        <DialogBody divider>
          {identifier === "car" && (
            <div className="space-y-3">
              <Image
                src={
                  values.images
                    ? URL.createObjectURL(values.images)
                    : `${process.env.API_URL}/images/${produk.selectedDataMobil?.imageId}`
                }
                alt={`Gambar Mobil - ${produk.selectedDataMobil?.imageId}`}
                height={400}
                width={500}
                className="w-full aspect-auto rounded-lg"
              />
              <div className="flex justify-center items-center gap-5">
                <input
                  type="file"
                  ref={gambar}
                  accept="image/*"
                  onChange={(image: any) => {
                    const data = image.target.files[0];
                    if (data) {
                      return (
                        data.type.includes("image") &&
                        data.size <= 5_000_000 &&
                        setFieldValue("images", data)
                      );
                    }
                    image.target.files = [];
                    image.target.value = "";
                    return setFieldValue("images", undefined);
                  }}
                  className="relative m-0 block w-full min-w-0 flex-auto rounded-md border border-solid border-gray-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-gray-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-gray-400 file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gray-200 focus:border-primary focus:text-gray-700 focus:shadow-te-primary focus:outline-none dark:border-gray-600 dark:text-gray-200 dark:file:bg-gray-700 dark:file:text-gray-100 dark:focus:border-primary"
                />
                <Tooltip
                  content={"Hapus gambar!"}
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                  className="bg-white text-gray-700 shadow-xl"
                >
                  <Button
                    disabled={!values.images}
                    className="p-2 flex justify-center items-center aspect-square rounded-full"
                    color="red"
                    onClick={() => {
                      setFieldValue("images", undefined);
                      gambar.current!.value = "";
                      gambar.current!.files = null;
                    }}
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
              </div>
              <p className="text-xs font-light">
                <span className="text-red-500">*</span> Pastikan ukuran file
                tidak lebih dari 5 Mb.
              </p>
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setHandleOpenEditImage(!handleOpenEditImage)}
            className="mr-1"
          >
            <span>Batal update</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              setHandleOpenEditImage(!handleOpenEditImage);
            }}
          >
            <span>Simpan perubahan</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ProductTable;
