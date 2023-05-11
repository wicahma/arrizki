export interface ReservasiWisata {}

export interface ReservasiMobil {}

export interface Pesanan {
  reservasiWisata: ReservasiWisata[];
  reservasiMobil: ReservasiMobil[];
}
