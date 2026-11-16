const API = "http://localhost:3000";

async function buscarParticipantes(naRoca) {
    const resposta = await fetch(`${API}/participantes?naRoca=${naRoca}`);
    return await resposta.json();
}

async function buscarVotos() {
    const resposta = await fetch(`${API}/votos`);
    return await resposta.json();
}

async function registrarVoto(participanteId) {
    const resposta = await fetch(`${API}/votos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            participanteId: participanteId,
            data: new Date().toISOString()
        })
    });
    return await resposta.json();
}

async function apagarVoto(id) {
    await fetch(`${API}/votos/${id}`, { method: "DELETE" });
}