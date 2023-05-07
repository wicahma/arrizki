import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Switch,
  Tooltip,
} from "@material-tailwind/react";
import React from "react";

interface PesananTableProps {
  tableTitle: string[];
  tableData: any[];
  identifier: string;
}

const PesananTable = (props: PesananTableProps) => {
  const { tableTitle, tableData, identifier } = props;
  
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
                          id={`switch-${i}-${ind}-${data._id}`}
                          defaultChecked={
                            String(value) === "aktif" ? true : false
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
                    <div className="w-4 transform hover:text-red-500 hover:scale-110">
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
                    <div className="w-4 transform hover:text-red-500 hover:scale-110">
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
                    <div className="w-4 transform hover:text-red-500 hover:scale-110">
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
                    <div className="w-4 transform hover:text-red-500 hover:scale-110">
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
      <Dialog open={false} size={"xs"} handler={() => console.log("test")}>
        <DialogHeader>Hapus data?.</DialogHeader>
        <DialogBody divider>
          Anda yakin ingin menghapus data dengan ID {}?. Kegiatan ini tidak
          dapat diundur kembali
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" className="mr-1">
            <span>Batal hapus</span>
          </Button>
          <Button variant="gradient" color="green">
            <span>Ya, hapus data</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* NOTE - Dialog Update Image */}
      <Dialog open={false} size={"xs"} handler={() => console.log()}>
        <DialogHeader>Update Gambar.</DialogHeader>
        <DialogBody divider>anjas</DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" className="mr-1">
            <span>Batal update</span>
          </Button>
          <Button variant="gradient" color="green">
            <span>Simpan perubahan</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default PesananTable;
