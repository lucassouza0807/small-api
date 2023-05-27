import { PrismaClient } from "@prisma/client";
import { EventEmitter } from "node:events";

async function seedDatabase(n_rows: number) {
    const prisma: any = new PrismaClient();

    for (let x: number = 0; x < n_rows; x++) {
        const terminais: any = prisma.terminalDeEntrada.findMany()
            .then((data: any[]) => {
                const date = new Date().toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
                const time = new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" });

                const ticket_sequence: number = Math.floor(Math.random() * (5 ** 20));

                return data.map((item: any) => {

                    const ticket_number: string = `${ticket_sequence}-${item.numero_terminal}`;

                    const ticket_status = prisma.ticketStatus.create({
                        data: {
                            numero_ticket: `${ticket_number}`,
                            terminal_de_entrada_id: item.terminal_id,
                            terminal_de_saida_id: 0,
                            ticket_status: "Pendente",
                            data_hora_entrada: `${date}, ${time}`
                        }
                    }).then(() => {
                        console.log(`Linha ${x} inserida com sucesso.`);
                        const eventEmmiter = new EventEmitter();
                        

                    }).catch((error: any) => {
                        console.log(error);
                    })
                })

            })
    }

}

seedDatabase(100)