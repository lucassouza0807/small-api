-- CreateTable
CREATE TABLE "Eventos" (
    "evento_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "evento" TEXT NOT NULL,
    "terminal" TEXT NOT NULL,
    "data_hora" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TerminalDeEntrada" (
    "terminal_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "terminal" TEXT NOT NULL,
    "numero_terminal" TEXT NOT NULL,
    "terminal_ip" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TerminalDeSaida" (
    "terminal_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "terminal" TEXT NOT NULL,
    "numero_terminal" TEXT NOT NULL,
    "terminal_ip" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TicketStatus" (
    "ticket_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero_ticket" TEXT NOT NULL,
    "ticket_status" TEXT NOT NULL,
    "data_hora_entrada" TEXT NOT NULL,
    "data_hora_saida" TEXT NOT NULL DEFAULT 'N/A',
    "forma_pgmt" TEXT NOT NULL DEFAULT 'N/A',
    "validado" BOOLEAN NOT NULL DEFAULT false,
    "pernoite" BOOLEAN NOT NULL DEFAULT false,
    "valor_pgmt" REAL NOT NULL DEFAULT 0,
    "terminal_de_entrada_id" INTEGER NOT NULL,
    "terminal_de_saida_id" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "TicketStatus_terminal_de_entrada_id_fkey" FOREIGN KEY ("terminal_de_entrada_id") REFERENCES "TerminalDeEntrada" ("terminal_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TicketStatus_terminal_de_saida_id_fkey" FOREIGN KEY ("terminal_de_saida_id") REFERENCES "TerminalDeSaida" ("terminal_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Mensalista" (
    "cliente_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "tel_fixo" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DadosVeiculoMensalista" (
    "veiculo_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "moto" BOOLEAN NOT NULL,
    "numero_cartao" INTEGER NOT NULL,
    "desconto_logista_local" BOOLEAN NOT NULL DEFAULT false,
    "is_blocked" BOOLEAN NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    CONSTRAINT "DadosVeiculoMensalista_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Mensalista" ("cliente_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DadosDePagamentoMensalista" (
    "pagamento_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "valor_pagamento" REAL NOT NULL,
    "mes_referencia" TEXT NOT NULL,
    "ano_referencia" TEXT NOT NULL,
    "data_pagamento" TEXT NOT NULL,
    "pagamento_vencido" BOOLEAN NOT NULL,
    "forma_de_pagamento" TEXT NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    CONSTRAINT "DadosDePagamentoMensalista_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Mensalista" ("cliente_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "TerminalDeEntrada_numero_terminal_key" ON "TerminalDeEntrada"("numero_terminal");

-- CreateIndex
CREATE UNIQUE INDEX "TerminalDeEntrada_terminal_ip_key" ON "TerminalDeEntrada"("terminal_ip");

-- CreateIndex
CREATE UNIQUE INDEX "TerminalDeSaida_numero_terminal_key" ON "TerminalDeSaida"("numero_terminal");

-- CreateIndex
CREATE UNIQUE INDEX "TerminalDeSaida_terminal_ip_key" ON "TerminalDeSaida"("terminal_ip");

-- CreateIndex
CREATE UNIQUE INDEX "TicketStatus_numero_ticket_key" ON "TicketStatus"("numero_ticket");

-- CreateIndex
CREATE UNIQUE INDEX "Mensalista_cpf_key" ON "Mensalista"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Mensalista_email_key" ON "Mensalista"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DadosVeiculoMensalista_numero_cartao_key" ON "DadosVeiculoMensalista"("numero_cartao");
