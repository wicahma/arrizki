import { mobilPilihan, wisataPilihan } from "@/interfaces/produkInterface";
import { reduxState } from "@/interfaces/reduxInterface";
import { setAlert } from "@/store/mainSlice";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Radio,
  Switch,
  Tooltip,
} from "@material-tailwind/react";
import axios from "axios";
import { useFormikContext } from "formik";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
    dispatch = useDispatch(),
    produk = useSelector((state: reduxState) => state.produk),
    [dataUpdateGambar, setDataGambar] = React.useState<any>([]),
    gambarWisata = React.useRef<HTMLInputElement>(null),
    gambarOutbond = React.useRef<HTMLInputElement>(null),
    gambarCar = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDataGambar([]);
  }, [handleOpenEditImage]);

  const getDataProduk = async (
    data: any,
    identifier: string,
    type?: string | undefined
  ) => {
    dispatch({
      type: "main/setLoading",
      payload: true,
    });
    axios
      .get(`${process.env.API_URL}/api/v1/${identifier}/${data._id}`)
      .then((res) => {
        switch (identifier) {
          case "wisata":
            type === "edit"
              ? dispatch({
                  type: "produk/setSelectedDataWisata",
                  payload: res.data.data,
                })
              : dispatch({
                  type: "produk/setSelectedDataWisataImage",
                  payload: res.data.data.jenisPaket,
                });
            break;
          case "outbond":
            type === "edit"
              ? dispatch({
                  type: "produk/setSelectedDataOutbond",
                  payload: res.data.data,
                })
              : dispatch({
                  type: "produk/setSelectedDataOutbondImage",
                  payload: res.data.data.jenisPaket,
                });
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        dispatch(
          setAlert({
            message: "Gagal mendapatkan data produk!",
            type: "error",
            show: true,
          })
        );
      })
      .finally(() => {
        dispatch({
          type: "main/setLoading",
          payload: false,
        });
      });
  };

  //NOTE - Update Status Handler
  const updateStatus = (
    dataSelected: wisataPilihan | mobilPilihan | any,
    status: boolean
  ) => {
    let carried;
    let state: any;
    switch (identifier) {
      case "wisata":
        state = "produk/setWisataState";
        carried = {
          ...dataSelected,
          status: status ? "aktif" : "nonaktif",
        };
        break;
      case "car":
        state = "produk/setMobilState";
        carried = {
          nama: dataSelected.unitName,
          harga: dataSelected.pricePerDay,
          seat: dataSelected.seat,
          fasilitas: dataSelected.fasilitas,
          status: status ? "aktif" : "nonaktif",
        };
        break;
      case "outbond":
        state = "produk/setOutbondState";
        carried = {
          ...dataSelected,
          status: status ? "aktif" : "nonaktif",
        };
        break;
      default:
        dispatch({
          type: "main/setLoading",
          payload: false,
        });
        return dispatch({
          type: "main/setAlert",
          payload: {
            type: "info",
            message: "Fitur Update Status belum diatur!",
            show: true,
          },
        });
    }
    dispatch({
      type: "main/setLoading",
      payload: true,
    });
    axios
      .put(
        `${process.env.API_URL}/api/v1/${identifier}/${dataSelected._id}`,
        carried,
        {
          headers: {
            Authorization: `Bearer ${
              (localStorage.getItem("token") ||
                sessionStorage.getItem("token")) ??
              ""
            }`,
          },
        }
      )
      .then(({ data }) => {
        dispatch({
          type: "main/setLoading",
          payload: false,
        });
        const newTableData: any[] = [...tableData];
        newTableData.splice(
          tableData.findIndex((d) => d._id === data.data._id),
          1,
          {
            ...tableData.filter((d) => d._id === data.data._id)[0],
            status: status ? "aktif" : "nonaktif",
          }
        );
        dispatch({ type: state, payload: newTableData });
        dispatch({
          type: "main/setAlert",
          payload: {
            type: "success",
            message: "Sukses mengubah status produk!",
            show: true,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: "main/setLoading",
          payload: false,
        });
        dispatch({
          type: "main/setAlert",
          payload: {
            type: "error",
            message: err.response?.data.message,
            show: true,
          },
        });
      });
  };

  //NOTE - Delete Handler
  const handleDelete = async (id: string) => {
    dispatch({
      type: "main/setLoading",
      payload: true,
    });
    let state: string;
    switch (identifier) {
      case "wisata":
        state = "produk/setWisataState";
        break;
      case "car":
        state = "produk/setMobilState";
        break;
      case "outbond":
        state = "produk/setOutbondState";
        break;
      default:
        dispatch({
          type: "main/setLoading",
          payload: false,
        });
        return dispatch({
          type: "main/setAlert",
          payload: {
            type: "info",
            message: "Fitur hapus data belum diatur!",
            show: true,
          },
        });
    }
    await axios
      .delete(`${process.env.API_URL}/api/v1/${identifier}/${id}`, {
        headers: {
          Authorization: `Bearer ${
            (localStorage.getItem("token") ||
              sessionStorage.getItem("token")) ??
            ""
          }`,
        },
      })
      .then(({ data, status }) => {
        dispatch({
          type: "main/setLoading",
          payload: false,
        });
        const newTableData = tableData.filter((data) => data._id !== id);
        dispatch({ type: state, payload: newTableData });
        dispatch({
          type: "main/setAlert",
          payload: {
            type: "success",
            message: data.message,
            show: true,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: "main/setLoading",
          payload: false,
        });
        dispatch({
          type: "main/setAlert",
          payload: {
            type: "error",
            message:
              err.response.data.message ||
              "Terjadi kesalahan, data gagal dihapus!",
            show: true,
          },
        });
      });
  };

  //NOTE - Edit Image Handler
  const handleEditImage = async (
    data: Array<File> | undefined,
    identifier: string | undefined,
    id: string | undefined
  ): Promise<any> => {
    dispatch({
      type: "main/setLoading",
      payload: true,
    });
    if (!id) {
      dispatch({
        type: "main/setLoading",
        payload: false,
      });
      return dispatch({
        type: "main/setAlert",
        payload: {
          type: "error",
          message:
            "ID belum terinput, Silahkan pilih ulang data yang akan diupdate terlebih dahulu",
          show: true,
        },
      });
    }
    const formData = new FormData();
    data?.map((file, i) => {
      formData.append("images", file);
    });
    axios
      .put(
        `${process.env.API_URL}/api/v1/${identifier}/${id}/images`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${
              (localStorage.getItem("token") ||
                sessionStorage.getItem("token")) ??
              ""
            }`,
          },
        }
      )
      .then((res) => {
        dispatch({
          type: "main/setAlert",
          payload: {
            type: "success",
            message: res.data.message,
            show: true,
          },
        });
        axios.get(`${process.env.API_URL}/api/v1/${identifier}`).then((res) => {
          let state;
          switch (identifier) {
            case "wisata":
              state = "produk/setWisataState";
              break;
            case "car":
              state = "produk/setMobilState";
              break;
            case "outbond":
              state = "produk/setOutbondState";
            default:
              break;
          }
          dispatch({ type: state, payload: res.data.data });
        });
      })
      .catch((err) => {
        dispatch({
          type: "main/setAlert",
          payload: {
            type: "error",
            message:
              "Terjadi kesalahan pada server! data gambar gagal diupdate!",
            show: true,
          },
        });
      })
      .finally(() => dispatch({ type: "main/setLoading", payload: false }));
  };

  //NOTE - Handle Preview Page
  const handlePreviewPage = (data: any, identifier: string) => {
    switch (identifier) {
      case "wisata":
        window.open(
          `/paket-tour/private/${data?.namaPaket}/${data?._id}/detail`,
          "_blank"
        );
        break;
      case "car":
        window.open(`/sewa-mobil`, "_blank");
        break;
      case "outbond":
        window.open(
          `/paket-tour/outbond/${data?.namaTempat}/${data?._id}/detail`,
          "_blank"
        );
        break;
      default:
        dispatch({
          type: "main/setAlert",
          payload: {
            type: "info",
            message: "Fitur belum diatur!",
            show: true,
          },
        });
        break;
    }
  };

  return (
    <>
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
          {tableData.map((data: any, i: number) => (
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
                          key={i}
                          id={`switch-${i}-${data._id}`}
                          defaultChecked={
                            String(value) === "aktif" ? true : false
                          }
                          onChange={(e) => updateStatus(data, e.target.checked)}
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
                            getDataProduk(data, identifier, "edit");
                            break;
                          case "outbond":
                            getDataProduk(data, identifier, "edit");
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
                            getDataProduk(data, identifier);
                            break;
                          case "outbond":
                            getDataProduk(data, identifier);
                            break;
                          default:
                            dispatch({
                              type: "main/setLoading",
                              payload: false,
                            });
                            return dispatch({
                              type: "main/setAlert",
                              payload: {
                                type: "info",
                                message: "Fitur edit gambar belum diatur!",
                                show: true,
                              },
                            });
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
        handler={() => {
          setHandleOpenEditImage(!handleOpenEditImage);
          setDataGambar([]);
          if (gambarWisata.current) {
            gambarWisata.current!.value = "";
            gambarWisata.current!.files = null;
          }
          if (gambarCar.current) {
            gambarCar.current!.value = "";
            gambarCar.current!.files = null;
          }
        }}
      >
        <DialogHeader>Update Gambar.</DialogHeader>
        <DialogBody divider>
          {/*//NOTE - Update Gambar Mobil*/}
          {identifier === "car" && (
            <div className="space-y-3">
              <Image
                src={
                  dataUpdateGambar.length > 0
                    ? URL.createObjectURL(dataUpdateGambar[0])
                    : `${process.env.API_URL}/images/${produk.selectedDataMobil?.imageId}`
                }
                alt={`Gambar Mobil - ${produk.selectedDataMobil?.imageId}`}
                height={400}
                width={500}
                className="w-full aspect-auto rounded-lg"
              />
              <div className="flex justify-center items-center gap-3">
                <input
                  type="file"
                  ref={gambarCar}
                  accept="image/*"
                  onChange={(image: any) => {
                    const data = image.target.files[0];
                    if (data) {
                      return (
                        data.type.includes("image") &&
                        data.size <= 5_000_000 &&
                        setDataGambar([data])
                      );
                    }
                    image.target.files = [];
                    image.target.value = "";
                    return setDataGambar([]);
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
                    disabled={dataUpdateGambar.length > 0 ? false : true}
                    className="p-2 flex justify-center items-center aspect-square rounded-full"
                    color="red"
                    onClick={() => {
                      setDataGambar([]);
                      gambarCar.current!.value = "";
                      gambarCar.current!.files = null;
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
          {/*//NOTE - Update Gambar Wisata*/}
          {identifier === "wisata" && (
            <div className="space-y-3">
              <div className="flex flex-col items-center bg-white shadow-lg rounded-xl p-3">
                <h2>Paket ke berapa yang ingin anda update?</h2>
                <div className="flex">
                  {produk.selectedDataWisataImage &&
                    produk.selectedDataWisataImage.map((gambarPaket, i) => (
                      <Radio
                        key={i}
                        id={`type-${i}`}
                        name="type"
                        label={`Paket ${i + 1}`}
                        onClick={() =>
                          dispatch({
                            type: "produk/setNewWisataImage",
                            payload: gambarPaket,
                          })
                        }
                        ripple={true}
                        // defaultChecked={i === 0}
                      />
                    ))}
                </div>
              </div>
              <div className="flex flex-nowrap gap-3">
                <input
                  type="file"
                  multiple
                  ref={gambarWisata}
                  accept="image/*"
                  onChange={(_: any) => {
                    const data: FileList = _.target.files;
                    setDataGambar([]);
                    if (data) {
                      return Array.from(data).forEach((file: File) => {
                        file.type.includes("image") &&
                          file.size <= 5_000_000 &&
                          setDataGambar((prev: any) => [...prev, file]);
                      });
                    }
                  }}
                  className="relative m-0 block w-full min-w-0 flex-auto rounded-md border border-solid border-gray-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-gray-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit  file:bg-gray-400 file:px-3 file:py-[0.45rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gray-200 focus:border-primary focus:text-gray-700 focus:shadow-te-primary focus:outline-none dark:border-gray-600 dark:text-gray-200 dark:file:bg-gray-700 dark:file:text-gray-100 dark:focus:border-primary"
                />
                <Tooltip
                  content={"Hapus data ini"}
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                  className="bg-white text-gray-700 shadow-xl"
                >
                  <Button
                    ripple
                    disabled={dataUpdateGambar.length > 0 ? false : true}
                    onClick={() => {
                      setDataGambar([]);
                      gambarWisata.current!.value = "";
                      gambarWisata.current!.files = null;
                    }}
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
              </div>
              <p className="text-xs font-light">
                <span className="text-red-500">*</span> Pastikan ukuran setiap
                file tidak lebih dari 5 Mb.
              </p>
              <div>
                {dataUpdateGambar.length > 0 ? (
                  <div>
                    <h3 className="text-lg text-black/80 text-start">
                      List Gambar
                    </h3>
                    {dataUpdateGambar.map((gambar: File, i: number) => (
                      <p key={i} className="text-black/70">
                        - {gambar.name}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="bg-blue-500 text-white rounded-md px-3 py-0">
                    File gambar belum ditambahkan
                  </p>
                )}
              </div>
            </div>
          )}
          {/*//NOTE - Update Gambar Outbond*/}
          {identifier === "outbond" && (
            <div className="space-y-3">
              <div className="flex flex-col items-center bg-white shadow-lg rounded-xl p-3">
                <h2>Paket ke berapa yang ingin anda update?</h2>
                <div className="flex">
                  {produk.selectedDataOutbondImage &&
                    produk.selectedDataOutbondImage.map((gambarPaket, i) => (
                      <Radio
                        key={i}
                        id={`type-${i}`}
                        name="type"
                        label={`Paket ${i + 1}`}
                        onClick={() =>
                          dispatch({
                            type: "produk/setNewOutbondImage",
                            payload: gambarPaket,
                          })
                        }
                        ripple={true}
                        // defaultChecked={i === 0}
                      />
                    ))}
                </div>
              </div>
              <div className="flex flex-nowrap gap-3">
                <input
                  type="file"
                  multiple
                  ref={gambarOutbond}
                  accept="image/*"
                  onChange={(_: any) => {
                    const data: FileList = _.target.files;
                    setDataGambar([]);
                    if (data) {
                      return Array.from(data).forEach((file: File) => {
                        file.type.includes("image") &&
                          file.size <= 5_000_000 &&
                          setDataGambar((prev: any) => [...prev, file]);
                      });
                    }
                  }}
                  className="relative m-0 block w-full min-w-0 flex-auto rounded-md border border-solid border-gray-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-gray-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit  file:bg-gray-400 file:px-3 file:py-[0.45rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gray-200 focus:border-primary focus:text-gray-700 focus:shadow-te-primary focus:outline-none dark:border-gray-600 dark:text-gray-200 dark:file:bg-gray-700 dark:file:text-gray-100 dark:focus:border-primary"
                />
                <Tooltip
                  content={"Hapus data ini"}
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                  className="bg-white text-gray-700 shadow-xl"
                >
                  <Button
                    ripple
                    disabled={dataUpdateGambar.length > 0 ? false : true}
                    onClick={() => {
                      setDataGambar([]);
                      gambarOutbond.current!.value = "";
                      gambarOutbond.current!.files = null;
                    }}
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
              </div>
              <p className="text-xs font-light">
                <span className="text-red-500">*</span> Pastikan ukuran setiap
                file tidak lebih dari 5 Mb.
              </p>
              <div>
                {dataUpdateGambar.length > 0 ? (
                  <div>
                    <h3 className="text-lg text-black/80 text-start">
                      List Gambar
                    </h3>
                    {dataUpdateGambar.map((gambar: File, i: number) => (
                      <p key={i} className="text-black/70">
                        - {gambar.name}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="bg-blue-500 text-white rounded-md px-3 py-0">
                    File gambar belum ditambahkan
                  </p>
                )}
              </div>
              {/*//TODO - Ngebuat button update image && button delete all image */}
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              setHandleOpenEditImage(!handleOpenEditImage);
              setDataGambar([]);
              if (gambarWisata.current) {
                gambarWisata.current!.value = "";
                gambarWisata.current!.files = null;
              }
              if (gambarCar.current) {
                gambarCar.current!.value = "";
                gambarCar.current!.files = null;
              }
              if (gambarOutbond.current) {
                gambarOutbond.current!.value = "";
                gambarOutbond.current!.files = null;
              }
            }}
            className="mr-1"
          >
            <span>Batal</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            disabled={dataUpdateGambar.length > 0 ? false : true}
            onClick={() => {
              let id;
              alert(produk.newOutbondImage?._id);
              switch (identifier) {
                case "car":
                  id = produk.selectedDataMobil?._id;
                  break;
                case "wisata":
                  id = produk.newWisataImage?._id;
                  break;
                case "outbond":
                  id = produk.newOutbondImage?._id;
                  break;
                default:
                  dispatch({
                    type: "main/setLoading",
                    payload: false,
                  });
                  return dispatch({
                    type: "main/setAlert",
                    payload: {
                      type: "info",
                      message: "Fitur Update Gambar belum diatur!",
                      show: true,
                    },
                  });
              }
              handleEditImage(dataUpdateGambar, identifier, id);
              setHandleOpenEditImage(!handleOpenEditImage);
            }}
          >
            <span>Update gambar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ProductTable;
