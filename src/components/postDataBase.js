import axios from "axios";

const postDataBase = async (params, direction) => {
  try {
    const response = await axios.post(direction, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.status === 200) {
      console.log("Enviado correctamente");
    } else {
      console.log("Error al enviar");
    }
  } catch (error) {
    console.log(error);
  }
};

export default postDataBase;
