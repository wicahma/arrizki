import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Switch,
  Tooltip,
} from "@material-tailwind/react";
import React, { useMemo } from "react";
import PrivateWisataRow from "./pesanan-row/private-wisata-row";
import MobilRow from "./pesanan-row/mobil-row";
import { useDispatch } from "react-redux";
import axios from "axios";
import OutbondWisataRow from "./pesanan-row/outbond-wisata-row";
import CustomWisataRow from "./pesanan-row/custom-wisata-row";

interface PesananTableProps {
  tableTitle: string[];
  tableData: any[];
  identifier: string;
}

const PesananTable = ({
  tableTitle,
  tableData,
  identifier,
}: PesananTableProps) => {
  const dispatch = useDispatch(),
    rupiah = (angka: number) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(angka);
    };
  //NOTE - Delete Handler
  const handleDeleteData = async (id: string) => {
    dispatch({
      type: "main/setLoading",
      payload: true,
    });
    let state: string;
    switch (identifier) {
      case "res-wisata":
        state = "pesanan/setReservasiWisata";
        break;
      case "res-car":
        state = "pesanan/setReservasiMobil";
        break;
      case "res-outbond":
        state = "pesanan/setReservasiOutbond";
        break;
      case "res-custom":
        state = "pesanan/setReservasiCustom";
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
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/${identifier}/${id}`, {
        headers: {
          Authorization: `Bearer ${
            (localStorage.getItem("token") ||
              sessionStorage.getItem("token")) ??
            ""
          }`,
        },
      })
      .then(({ data }) => {
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
  const [handleDelete, setHandleDelete] = React.useState(false),
    [handleSeeCar, setHandleSeeCar] = React.useState(false),
    [carData, setCarData] = React.useState<any>({}),
    [selectedID, setSelectedID] = React.useState(""),
    mappedData = useMemo(() => {
      switch (identifier) {
        case "res-wisata":
          return tableData.map((data, index) => (
            <PrivateWisataRow
              key={index}
              data={data}
              i={index}
              deleteContext={({
                row_data,
                id,
                handler,
              }: {
                row_data: any;
                id: string;
                handler: boolean;
              }) => {
                setSelectedID(id);
                setHandleDelete(handler);
              }}
            />
          ));
        case "res-outbond":
          return tableData.map((data, index) => (
            <OutbondWisataRow
              key={index}
              data={data}
              i={index}
              deleteContext={({
                row_data,
                id,
                handler,
              }: {
                row_data: any;
                id: string;
                handler: boolean;
              }) => {
                setSelectedID(id);
                setHandleDelete(handler);
              }}
            />
          ));
        case "res-custom":
          return tableData.map((data, index) => (
            <CustomWisataRow
              key={index}
              data={data}
              i={index}
              deleteContext={({
                id,
                handler,
              }: {
                id: string;
                handler: boolean;
              }) => {
                setSelectedID(id);
                setHandleDelete(handler);
              }}
            />
          ));
        case "res-car":
          return tableData.map((data, index) => (
            <MobilRow
              i={index}
              key={index}
              data={data}
              seeCarContext={({ car_data, handler }) => {
                setHandleSeeCar(handler);
                setCarData(car_data);
              }}
              deleteContext={({
                id,
                handler,
              }: {
                id: string;
                handler: boolean;
              }) => {
                setSelectedID(id);
                setHandleDelete(handler);
              }}
            />
          ));
      }
    }, [tableData, identifier]);

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
        <tbody className="text-gray-600 text-sm font-light">{mappedData}</tbody>
      </table>
      {/* NOTE - Dialog Delete Data */}
      <Dialog
        open={handleDelete}
        size={"xs"}
        handler={() => setHandleDelete(false)}
      >
        <DialogHeader>Hapus data?.</DialogHeader>
        <DialogBody divider>
          Anda yakin ingin menghapus data dengan ID {selectedID}?. Kegiatan ini
          tidak dapat diundur kembali
        </DialogBody>
        <DialogFooter>
          <Button
            onClick={() => setHandleDelete(false)}
            variant="text"
            color="red"
            className="mr-1"
          >
            <span>Batal hapus</span>
          </Button>
          <Button
            variant="gradient"
            onClick={() => {
              handleDeleteData(selectedID);
              setHandleDelete(false);
            }}
            color="green"
          >
            <span>Ya, hapus data</span>
          </Button>
        </DialogFooter>
      </Dialog>
      {/* NOTE - Dialog Lihat Data Mobil */}
      <Dialog
        open={handleSeeCar}
        size={"xs"}
        handler={() => {
          setCarData({});
          return setHandleSeeCar(false);
        }}
      >
        <DialogHeader className="uppercase">
          {carData.unitName ?? ""}
        </DialogHeader>
        <DialogBody divider className="text-blue-gray-800">
          <h2 className="text-xl font-medium uppercase mb-2">
            ID-{carData._id}
          </h2>
          <ul>
            <li>
              <p> Harga - {rupiah(carData.pricePerDay)}/Hari</p>
            </li>
            <li>
              <p>Seat - {carData.seat}</p>
            </li>
            <li>
              <p>Fasilitas - {carData.fasilitas}</p>
            </li>
            <li>
              <p>Status - {carData.status}</p>
            </li>
          </ul>
        </DialogBody>
        <DialogFooter>
          <Button
            onClick={() => {
              setCarData({});
              setHandleSeeCar(false);
            }}
            variant="text"
            color="red"
            className="mr-1"
          >
            <span>Tutup</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default PesananTable;
