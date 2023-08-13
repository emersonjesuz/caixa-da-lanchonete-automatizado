class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    const formaDePagamentoInvalida =
      metodoDePagamento !== "dinheiro" &&
      metodoDePagamento !== "debito" &&
      metodoDePagamento !== "credito";
    if (formaDePagamentoInvalida) return this.naoInformouFormaDePagamento();

    if (!itens.length) return this.naoFezNenhumPedido();
    return this.calculandoPedidos(metodoDePagamento, itens);
  }

  calculandoPedidos(metodoDePagamento, itens) {
    let temPedidoInvalido = "";
    let valorTotalDoPedido = 0;
    let pedidoExtraDoCafe = false;
    let pedidoExtraDoSanduiche = false;
    let sanduicheNoPedido = false;
    let cafeNoPedido = false;
    for (let iten of itens) {
      const cadaPedido = iten.split(",");

      const codigoDoPedido = cadaPedido[0];
      const quantidadeDeItensPedido = +cadaPedido[1] ? +cadaPedido[1] : 0;
      if (codigoDoPedido === "cafe") {
        cafeNoPedido = true;
        valorTotalDoPedido += 300 * +quantidadeDeItensPedido;
      } else if (codigoDoPedido === "sanduiche") {
        sanduicheNoPedido = true;
        valorTotalDoPedido += 650 * +quantidadeDeItensPedido;
      } else if (codigoDoPedido === "chantily") {
        pedidoExtraDoCafe = true;
        valorTotalDoPedido += 150 * +quantidadeDeItensPedido;
      } else if (codigoDoPedido === "suco") {
        valorTotalDoPedido += 620 * +quantidadeDeItensPedido;
      } else if (codigoDoPedido === "queijo") {
        pedidoExtraDoSanduiche = true;
        valorTotalDoPedido += 200 * +quantidadeDeItensPedido;
      } else if (codigoDoPedido === "salgado") {
        valorTotalDoPedido += 725 * +quantidadeDeItensPedido;
      } else if (codigoDoPedido === "combo1") {
        valorTotalDoPedido += 950 * +quantidadeDeItensPedido;
      } else if (codigoDoPedido === "combo2") {
        valorTotalDoPedido += 750 * +quantidadeDeItensPedido;
      } else {
        temPedidoInvalido = "Item inválido!";
        break;
      }

      const verificandoPedidoComValorZerado = +cadaPedido[1];
      if (!verificandoPedidoComValorZerado) return "Quantidade inválida!";
    }
    if (temPedidoInvalido) return temPedidoInvalido;

    const temPedidoExtraSemPrincipal =
      (pedidoExtraDoCafe && !cafeNoPedido) ||
      (pedidoExtraDoSanduiche && !sanduicheNoPedido);

    if (temPedidoExtraSemPrincipal) return this.pedidoExtraSemPrincipal();

    if (metodoDePagamento === "dinheiro") valorTotalDoPedido *= 0.95;

    if (metodoDePagamento === "credito")
      valorTotalDoPedido += valorTotalDoPedido *= 0.03;
    const convertendoValorTotal =
      "R$ " + (valorTotalDoPedido / 100).toFixed(2).replace(".", ",");
    return convertendoValorTotal;
  }

  pedidoExtraSemPrincipal() {
    return "Item extra não pode ser pedido sem o principal";
  }

  naoFezNenhumPedido() {
    return "Não há itens no carrinho de compra!";
  }

  naoInformouFormaDePagamento() {
    return "Forma de pagamento inválida!";
  }
}

export { CaixaDaLanchonete };
