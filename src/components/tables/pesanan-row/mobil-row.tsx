import { setSelectedResMobil } from "@/store/pesananSlice";
import { Button, Tooltip } from "@material-tailwind/react";
import { useDispatch } from "react-redux";

interface MobilRow {
  i: number;
  data: any;
  deleteContext: ({ id, handler }: { id: string; handler: boolean }) => void;
  seeCarContext: ({
    car_data,
    handler,
  }: {
    car_data: any;
    handler: boolean;
  }) => void;
  invoiceContext: ({ id, handler }: { id: string; handler: boolean }) => void;
}

const MobilRow = ({
  i,
  data,
  deleteContext,
  seeCarContext,
  invoiceContext,
}: MobilRow) => {
  const dateFormatter = (date: string) => {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
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
          {data.instagram}
        </p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap px-6 text-center">
          {dateFormatter(data.tanggalReservasi)}
        </p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap px-6 text-center">
          {data.waktuAntar}
        </p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap px-6 text-center">
          {data.lokasiAntar}
        </p>
      </td>
      <td>
        <div className="flex justify-center items-center">
          <Button
            onClick={() =>
              seeCarContext({
                car_data: data.unitId,
                handler: true,
              })
            }
            color="orange"
            className="p-2"
          >
            Lihat Unit
          </Button>
        </div>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap px-6 text-center">
          {data.pesananTambahan}
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
                dispatch(setSelectedResMobil(data));
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
      <td className="py-3 px-6 text-center">
        <div className="flex item-center space-x-2 px-3 py-1 rounded-full w-fit mx-auto justify-center">
          <Tooltip
            content={"Kirim Email Invoice"}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            className="bg-white text-gray-700 shadow-xl"
          >
            <Button
              onClick={() =>
                invoiceContext({
                  handler: true,
                  id: data._id,
                })
              }
              className="p-1"
              color="light-blue"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 aspect-square"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </Button>
          </Tooltip>
        </div>
      </td>
    </tr>
  );
};

export default MobilRow;
