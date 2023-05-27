import { PrismaClient } from "@prisma/client";

async function mockTerminal() {
    const prisma: any = new PrismaClient();

    const sides: string[] = ["D", "E"];

    const terminal = prisma.terminalDeEntrada.create({
        data: {
            terminal: `TE ${Math.floor(Math.random() * 20)}${sides[Math.floor(Math.random() * sides.length)]}`,
            numero_terminal: `${Math.floor(Math.random() * 50) + 1}`,
            terminal_ip: `192.168.10.${Math.floor(Math.random() * 100)}`
        }
    }).then(() => {
        console.log("Sucesso")
    }).catch((error: any) => {
        console.log(error)
    })

}

function createGhostTerminal() {
    const prisma = new PrismaClient();

    prisma.terminalDeSaida.create({
        data: {
            terminal_id: 0,
            terminal: "N/A",
            numero_terminal: "N/A",
            terminal_ip: "192.168.0.100"
        }

    }).then(() => {
        console.log("Sucesso")
    }).catch((error: any) => {
        console.log(error)
    })
}

createGhostTerminal();
for (let n_rows = 0; n_rows < 5; n_rows++) {
    mockTerminal();
}