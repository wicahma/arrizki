import { getPaketWisata } from "@/interfaces/pesananInterface";
import { setSelectedResWisata } from "@/store/pesananSlice";
import { Tooltip } from "@material-tailwind/react";
import { useDispatch } from "react-redux";

interface PrivateWisataRow {
  i: number;
  data: any;
  deleteContext: ({
    row_data,
    id,
    handler,
  }: {
    row_data: any;
    id: string;
    handler: boolean;
  }) => void;
}

const PrivateWisataRow = ({ data, i, deleteContext }: PrivateWisataRow) => {
  const dateFormatter = (date: string) => {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    rupiah = (angka: number) => {
      return Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(angka);
    },
    dispatch = useDispatch();
  return (
    <tr
      key={i}
      className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
    >
      <td>
        <p className="text-gray-900 uppercase whitespace-no-wrap px-6 text-center">
          {data._id}
        </p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap px-6 text-center">
          {data.namaReservant}
        </p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap px-6 text-center">
          {data.phoneNumber}
        </p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap px-6 text-center">
          {data.email}
        </p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap px-6 text-center">
          {dateFormatter(data.tanggalMulai)}
        </p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap px-6 text-center">
          {data.paketWisataId}
        </p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap px-6 text-center">
          {data.waktuJemput}
        </p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap px-6 text-center">
          {data.lokasiJemput}
        </p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap px-6 text-center">
          {data.pesananTambahan}
        </p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap px-6 text-center">
          {rupiah(data.harga)}
        </p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap px-6 text-center">
          {data.jumlahPeserta}
        </p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap px-6 text-center">
          {dateFormatter(data.createdAt)}
        </p>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex item-center bg-gray-300 space-x-2 px-3 py-1 rounded-full w-fit mx-auto justify-center">
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
                getPaketWisata({
                  paketID: data.paketWisataId,
                  dispatch: dispatch,
                });
                dispatch(setSelectedResWisata(data));
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
              onClick={() =>
                deleteContext({
                  row_data: data,
                  id: data._id,
                  handler: true,
                })
              }
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
  );
};

export default PrivateWisataRow;