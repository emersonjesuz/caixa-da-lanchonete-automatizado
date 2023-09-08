export class CaixaDaLanchonete {
  constructor() {
    this.pagamento = ["dinheiro", "debito", "credito"];
    this.temPedidoInvalido = "";
    this.valorTotalDoPedido = 0;
    this.pedidoExtraDoCafe = false;
    this.pedidoExtraDoSanduiche = false;
    this.sanduicheNoPedido = false;
    this.cafeNoPedido = false;
    this.cardapio = {
      cafe: 300,
      chantily: 150,
      suco: 620,
      sanduiche: 650,
      queijo: 200,
      salgado: 725,
      combo1: 950,
      combo2: 750,
    };
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (!metodoDePagamento) return "Forma de pagamento inválida!";

    if (!this.formaDePagamento(metodoDePagamento))
      return "Forma de pagamento inválida!";

    if (!itens || !itens.length) return "Não há itens no carrinho de compra!";

    return this.calculandoPedidos(metodoDePagamento, itens);
  }

  formaDePagamento(metodoDePagamento) {
    if (this.pagamento.indexOf(metodoDePagamento) === -1) {
      return false;
    }
    return true;
  }

  anotandoPedidoComExtra(pedido) {
    if (pedido === "cafe") {
      this.cafeNoPedido = true;
    } else if (pedido === "sanduiche") {
      this.sanduicheNoPedido = true;
    } else if (pedido === "chantily") {
      this.pedidoExtraDoCafe = true;
    } else if (pedido === "queijo") {
      this.pedidoExtraDoSanduiche = true;
    }
  }

  verificandoCodigoDoPedido(codigoDoPedido) {
    let valorDoPedido = 0;
    let contidadeDeItemInvalido = 0;
    for (const pedido of Object.entries(this.cardapio)) {
      if (pedido[0] !== codigoDoPedido) {
        contidadeDeItemInvalido++;
      }

      if (pedido[0] === codigoDoPedido) {
        if (!pedido[1]) {
          this.temPedidoInvalido = "Quantidade inválida!";
          break;
        }
        this.anotandoPedidoComExtra(codigoDoPedido);
        valorDoPedido = pedido[1];
      }
    }
    if (contidadeDeItemInvalido === Object.entries(this.cardapio).length) {
      return (this.temPedidoInvalido = "Item inválido!");
    }
    return valorDoPedido;
  }

  analisandoPedidoExtra() {
    const temPedidoExtraSemPrincipal =
      (this.pedidoExtraDoCafe && !this.cafeNoPedido) ||
      (this.pedidoExtraDoSanduiche && !this.sanduicheNoPedido);

    return temPedidoExtraSemPrincipal;
  }

  calculandoPedidos(metodoDePagamento, itens) {
    for (let iten of itens) {
      const cadaPedido = iten.split(",");

      const verificandoPedido = this.verificandoCodigoDoPedido(cadaPedido[0]);

      if (typeof verificandoPedido === "string") {
        break;
      }
      if (!Number(cadaPedido[1])) return "Quantidade inválida!";
      this.valorTotalDoPedido += verificandoPedido * +cadaPedido[1];
    }

    if (this.temPedidoInvalido) return this.temPedidoInvalido;

    if (this.analisandoPedidoExtra())
      return "Item extra não pode ser pedido sem o principal";

    this.aplicandoFormaDePagamento(metodoDePagamento);

    return this.convertendoValor(this.valorTotalDoPedido);
  }

  aplicandoFormaDePagamento(metodoDePagamento) {
    if (metodoDePagamento === "dinheiro") this.valorTotalDoPedido *= 0.95;

    if (metodoDePagamento === "credito")
      this.valorTotalDoPedido += this.valorTotalDoPedido *= 0.03;
  }

  convertendoValor(valor) {
    return "R$ " + (valor / 100).toFixed(2).replace(".", ",");
  }
}
