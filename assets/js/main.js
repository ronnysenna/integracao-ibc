document.addEventListener("DOMContentLoaded", function () {
  function toggleFields() {
    document.getElementById("batismoFields").style.display =
      document.getElementById("batizarSim").checked ? "block" : "none";

    document.getElementById("batismoNaoFields").style.display =
      document.getElementById("batizarNao").checked ? "block" : "none";

    document.getElementById("grFields").style.display = document.getElementById(
      "temGrSim"
    ).checked
      ? "block"
      : "none";

    document.getElementById("interesseGrFields").style.display =
      document.getElementById("temGrNao").checked ? "block" : "none";

    document.getElementById("radicalFields").style.display =
      document.getElementById("radicalSim").checked ? "block" : "none";

    document.getElementById("radicalNaoFields").style.display =
      document.getElementById("radicalNao").checked ? "block" : "none";
  }

  function onlyOneCheckbox(selectedCheckbox) {
    let checkboxes = document.getElementsByName("MotivoRadical");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    selectedCheckbox.checked = true;
  }

  document
    .getElementById("batismoForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      let formData = new FormData(event.target);
      let jsonData = Object.fromEntries(formData.entries());

      console.log("Dados enviados:", jsonData);

      fetch("https://n8n.ronnysenna.com.br/webhook/batismo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
          }
          return response.text();
        })
        .then((data) => {
          // Salva o nome no localStorage
          localStorage.setItem("nomeUsuario", jsonData.Nome);

          // Popup de sucesso
          Swal.fire({
            icon: "success",
            title: "Cadastro enviado com sucesso!",
            text: "Obrigado por realizar o seu cadastro!",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            allowOutsideClick: false,
          });

          // Redireciona após 3 segundos
          setTimeout(() => {
            window.location.href = "/integra/confirmacao.html";
          }, 3000);
        })

        .catch((error) => {
          console.error("Erro detalhado:", error);
          Swal.fire(
            "Erro!",
            "Erro ao enviar cadastro: " + error.message,
            "error"
          );
        });
    });

  document.querySelectorAll("input[type=radio]").forEach(function (radio) {
    radio.addEventListener("change", toggleFields);
  });

  toggleFields();
});
