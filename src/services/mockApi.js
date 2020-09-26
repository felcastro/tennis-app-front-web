import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const places = [
  {
    id: 1,
    name: "Sociedade Libanesa",
    address:
      "Av. Sociedade Libanesa, 10 - Boa Vista, Porto Alegre - RS, 91340-330",
    email: "sociedadelibanesa@gmail.com",
    phone: "(51) 3333-5522",
    website: "https://sociedadelibanesa.com.br",
    pictureUrl:
      "https://storage.googleapis.com/tennis-app-bucket/images/places/5e683fb01c9d4400005383ce.jpg",
    latitude: -51.1776486,
    longitude: -30.0268964,
    courts: [
      {
        id: 1,
        name: "Quadra 1",
        sport: "Tênis",
        type: "Saibro",
        covered: false,
        active: true,
      },
      {
        id: 2,
        name: "Quadra 2",
        sport: "Tênis",
        type: "Saibro",
        covered: false,
        active: true,
      },
      {
        id: 3,
        name: "Quadra 3",
        sport: "Tênis",
        type: "Saibro",
        covered: false,
        active: true,
      },
      {
        id: 4,
        name: "Quadra 4",
        sport: "Tênis",
        type: "Saibro",
        covered: true,
        active: true,
      },
      {
        id: 5,
        name: "Quadra 5",
        sport: "Tênis",
        type: "Saibro",
        covered: true,
        active: true,
      },
      {
        id: 6,
        name: "Quadra 1",
        sport: "Beach Tennis",
        type: "Areia",
        covered: false,
        active: true,
      },
    ],
  },
  //   {
  //     id: 2,
  //     name: "Grêmio Náutico União",
  //     address: "Av. João Obino, 300 - Petrópolis, Porto Alegre - RS, 90470-150",
  //     email: "",
  //     phone: "5130253800",
  //     website: "https://www.gnu.com.br",
  //     pictureUrl:
  //       "https://storage.googleapis.com/tennis-app-bucket/images/places/5e683be11c9d4400005383ca.jpg",
  //     latitude: -51.1850393,
  //     longitude: -30.034093,
  //     courts: [],
  //   },
  //   {
  //     id: 3,
  //     name: "Sogipa",
  //     address:
  //       "R. Barão do Cotegipe, 415 - São João, Porto Alegre - RS, 90540-020",
  //     email: "",
  //     phone: "5133257200",
  //     website: "https://www.sogipa.com.br",
  //     pictureUrl:
  //       "https://storage.googleapis.com/tennis-app-bucket/images/places/5e683de31c9d4400005383cb.jpg",
  //     latitude: -51.1896887,
  //     longitude: -30.01,
  //     courts: [],
  //   },
  {
    id: 4,
    name: "Dietze Tennis",
    address:
      "Rua Tomaz Gonzaga, 704 - Três Figueiras, Porto Alegre - RS, 91340-480",
    email: "",
    phone: "(51) 3328-1598",
    website: "",
    pictureUrl:
      "https://storage.googleapis.com/tennis-app-bucket/images/places/5e683e751c9d4400005383cc.jpg",
    latitude: -51.1754556,
    longitude: -30.0278524,
    courts: [
      {
        id: 1,
        name: "Quadra 1",
        sport: "Tênis",
        type: "Saibro",
        covered: false,
        active: true,
      },
      {
        id: 2,
        name: "Quadra 2",
        sport: "Tênis",
        type: "Saibro",
        covered: false,
        active: true,
      },
      {
        id: 3,
        name: "Quadra 3",
        sport: "Tênis",
        type: "Saibro",
        covered: false,
        active: true,
      },
      {
        id: 4,
        name: "Quadra 4",
        sport: "Tênis",
        type: "Saibro",
        covered: false,
        active: true,
      },
    ],
  },
  {
    id: 5,
    name: "It's Esportes Nilo",
    address:
      "Av. Dr. Nilo Peçanha, 3370 - Petrópolis, Porto Alegre - RS, 91340-010",
    email: "atendimentonilo@itsesportes.com.br",
    phone: "(51) 99840-7150",
    website: "https://www.itsesportes.com.br/home-nilo",
    pictureUrl:
      "https://static.wixstatic.com/media/7b7a56_fb536661d3b34b8a95681b21803bbc7b~mv2_d_6016_4016_s_4_2.jpg/v1/fill/w_216,h_216,al_c,q_80,usm_0.66_1.00_0.01/7b7a56_fb536661d3b34b8a95681b21803bbc7b~mv2_d_6016_4016_s_4_2.webp",
    latitude: -51.157446,
    longitude: -30.0288322,
    courts: [
      {
        id: 1,
        name: "Quadra 1",
        sport: "Beach Tennis",
        type: "Areia",
        covered: false,
        active: true,
      },
      {
        id: 2,
        name: "Quadra 2",
        sport: "Beach Tennis",
        type: "Areia",
        covered: false,
        active: true,
      },
      {
        id: 3,
        name: "Quadra 3",
        sport: "Beach Tennis",
        type: "Areia",
        covered: false,
        active: true,
      },
      {
        id: 4,
        name: "Quadra 4",
        sport: "Beach Tennis",
        type: "Areia",
        covered: false,
        active: true,
      },
      {
        id: 5,
        name: "Quadra 5",
        sport: "Beach Tennis",
        type: "Areia",
        covered: true,
        active: true,
      },
      {
        id: 6,
        name: "Quadra 6",
        sport: "Beach Tennis",
        type: "Areia",
        covered: true,
        active: true,
      },
      {
        id: 7,
        name: "Quadra 7",
        sport: "Beach Tennis",
        type: "Areia",
        covered: true,
        active: true,
      },
    ],
  },

  //   {
  //     id: 5,
  //     name: "Associação Leopoldina Juvenil",
  //     address:
  //       "R. Marquês do Herval, 280 - Moinhos de Vento, Porto Alegre - RS, 90570-140",
  //     email: "",
  //     phone: "5133234300",
  //     website: "https://www.juvenil.com.br",
  //     pictureUrl:
  //       "https://storage.googleapis.com/tennis-app-bucket/images/places/5e6840571c9d4400005383cf.jpg",
  //     latitude: -51.2034178,
  //     longitude: -30.0212882,
  //     courts: [],
  //   },
];

const mock = new MockAdapter(axios, { delayResponse: 500 });

mock.onGet("/api/places").reply(200, places);

mock.onGet("/api/places/1").reply(200, places.filter((p) => p.id === 1)[0]);
mock.onGet("/api/places/4").reply(200, places.filter((p) => p.id === 4)[0]);
mock.onGet("/api/places/5").reply(200, places.filter((p) => p.id === 5)[0]);

export default axios;
