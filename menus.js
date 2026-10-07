// 4 weekly menus + 26 combinations = 30 extra ideas.
const WEEKS = [
  {
    "id": "semana-1",
    "title": "Uma semana de clássicos",
    "description": "Preparos caseiros para começar, com acompanhamentos fáceis de combinar.",
    "days": [
      {
        "name": "Segunda-feira",
        "meals": {
          "cafe": "pao-de-queijo-tradicional",
          "almoco": "frango-empanado-crocante",
          "lanche": "torrada-de-ricota-e-tomate",
          "jantar": "arroz-de-forno-com-legumes",
          "sobremesa": "banana-assada-com-canela"
        }
      },
      {
        "name": "Terça-feira",
        "meals": {
          "cafe": "omelete-de-queijo-e-tomate",
          "almoco": "bife-de-alcatra-com-alho",
          "lanche": "bolinho-de-mandioca-com-queijo",
          "jantar": "quiche-de-brocolis",
          "sobremesa": "maca-recheada-com-uva-passa"
        }
      },
      {
        "name": "Quarta-feira",
        "meals": {
          "cafe": "aveia-assada-com-banana",
          "almoco": "tilapia-com-limao-e-alho",
          "lanche": "minipizza-de-milho",
          "jantar": "torta-pequena-de-frango",
          "sobremesa": "pessego-assado"
        }
      },
      {
        "name": "Quinta-feira",
        "meals": {
          "cafe": "misto-quente-caseiro",
          "almoco": "linguica-fresca-com-batata",
          "lanche": "muffin-de-banana-com-aveia",
          "jantar": "berinjela-recheada-com-lentilha",
          "sobremesa": "creme-de-baunilha-assado"
        }
      },
      {
        "name": "Sexta-feira",
        "meals": {
          "cafe": "pao-rapido-de-iogurte",
          "almoco": "arroz-de-forno-com-atum",
          "lanche": "batata-rustica-com-paprica",
          "jantar": "omelete-de-abobrinha",
          "sobremesa": "crumble-de-pera"
        }
      },
      {
        "name": "Sábado",
        "meals": {
          "cafe": "bolo-pequeno-de-fuba",
          "almoco": "espetinho-bovino-com-cebola",
          "lanche": "pastel-de-queijo-com-tomate",
          "jantar": "pizza-individual-de-palmito",
          "sobremesa": "brownie-com-nozes"
        }
      },
      {
        "name": "Domingo",
        "meals": {
          "cafe": "cestinha-de-pao-com-ovo",
          "almoco": "escondidinho-de-mandioca-e-frango",
          "lanche": "folhado-de-banana-com-coco",
          "jantar": "sufle-de-cenoura",
          "sobremesa": "tortinha-de-maca"
        }
      }
    ]
  },
  {
    "id": "semana-2",
    "title": "Mais vegetais no prato",
    "description": "Legumes, grãos e queijos em sugestões variadas ao longo da semana.",
    "days": [
      {
        "name": "Segunda-feira",
        "meals": {
          "cafe": "torrada-de-espinafre-e-cottage",
          "almoco": "hamburguer-de-lentilha-e-aveia",
          "lanche": "bolinho-de-grao-de-bico-e-cenoura",
          "jantar": "quiche-de-abobora-e-ricota",
          "sobremesa": "pera-com-chocolate"
        }
      },
      {
        "name": "Terça-feira",
        "meals": {
          "cafe": "panquequinha-de-queijo",
          "almoco": "abobrinha-recheada-com-carne",
          "lanche": "palmito-assado-com-ervas",
          "jantar": "torta-pequena-de-legumes",
          "sobremesa": "manga-assada-com-limao"
        }
      },
      {
        "name": "Quarta-feira",
        "meals": {
          "cafe": "aveia-assada-com-morango",
          "almoco": "macarrao-gratinado-com-brocolis",
          "lanche": "pastel-de-palmito-cremoso",
          "jantar": "sufle-de-espinafre",
          "sobremesa": "crumble-de-morango"
        }
      },
      {
        "name": "Quinta-feira",
        "meals": {
          "cafe": "muffin-de-milho",
          "almoco": "couve-flor-gratinada",
          "lanche": "espetinho-de-legumes-coloridos",
          "jantar": "hamburguer-de-grao-de-bico",
          "sobremesa": "biscoito-de-coco"
        }
      },
      {
        "name": "Sexta-feira",
        "meals": {
          "cafe": "paozinho-de-espinafre",
          "almoco": "batata-doce-recheada-com-feijao",
          "lanche": "bolinho-de-brocolis-e-ricota",
          "jantar": "quiche-de-tomate-e-manjericao",
          "sobremesa": "tortinha-de-banana"
        }
      },
      {
        "name": "Sábado",
        "meals": {
          "cafe": "torrada-de-cogumelos",
          "almoco": "bacalhau-dessalgado-com-pimentao",
          "lanche": "chips-de-batata-doce",
          "jantar": "pizza-individual-de-espinafre",
          "sobremesa": "abacaxi-com-coco"
        }
      },
      {
        "name": "Domingo",
        "meals": {
          "cafe": "ovo-assado-com-batata-doce",
          "almoco": "pimentao-recheado-com-arroz",
          "lanche": "folhado-de-abobora-e-queijo",
          "jantar": "torta-pequena-de-lentilha",
          "sobremesa": "brownie-com-coco"
        }
      }
    ]
  },
  {
    "id": "semana-3",
    "title": "Praticidade em porções pequenas",
    "description": "Porções individuais e receitas para cozinhar sem ocupar o dia inteiro.",
    "days": [
      {
        "name": "Segunda-feira",
        "meals": {
          "cafe": "panquequinha-de-banana",
          "almoco": "frango-em-cubos-com-pimentao",
          "lanche": "sanduiche-de-atum-e-cenoura",
          "jantar": "quiche-de-palmito",
          "sobremesa": "banana-da-terra-com-coco"
        }
      },
      {
        "name": "Terça-feira",
        "meals": {
          "cafe": "torrada-de-tomate-com-manjericao",
          "almoco": "hamburguer-bovino-classico",
          "lanche": "minipizza-de-ricota-e-tomate",
          "jantar": "arroz-de-forno-com-frango",
          "sobremesa": "creme-de-cafe-assado"
        }
      },
      {
        "name": "Quarta-feira",
        "meals": {
          "cafe": "ovo-no-ramequim-com-tomate",
          "almoco": "salmao-com-mostarda",
          "lanche": "bolinho-de-feijao-fradinho",
          "jantar": "torta-pequena-de-atum",
          "sobremesa": "figo-com-mel"
        }
      },
      {
        "name": "Quinta-feira",
        "meals": {
          "cafe": "pao-rapido-de-cenoura",
          "almoco": "cubos-suinos-com-pimentao",
          "lanche": "muffin-salgado-de-abobrinha",
          "jantar": "sufle-de-milho",
          "sobremesa": "biscoito-de-amendoim"
        }
      },
      {
        "name": "Sexta-feira",
        "meals": {
          "cafe": "aveia-assada-com-cacau",
          "almoco": "nhoque-de-batata-gratinado",
          "lanche": "grao-de-bico-crocante",
          "jantar": "tomate-recheado-com-ricota",
          "sobremesa": "crumble-de-banana"
        }
      },
      {
        "name": "Sábado",
        "meals": {
          "cafe": "bolo-pequeno-de-cafe",
          "almoco": "espetinho-de-frango-com-abacaxi",
          "lanche": "pastel-de-banana-com-canela",
          "jantar": "pizza-individual-de-carne",
          "sobremesa": "tortinha-de-chocolate"
        }
      },
      {
        "name": "Domingo",
        "meals": {
          "cafe": "granola-de-coco-e-sementes",
          "almoco": "sobrecoxa-com-ervas",
          "lanche": "folhado-de-atum-com-azeitona",
          "jantar": "hamburguer-de-quinoa-e-batata",
          "sobremesa": "bolo-pequeno-de-maracuja"
        }
      }
    ]
  },
  {
    "id": "semana-4",
    "title": "Sabores para sair da rotina",
    "description": "Peixes, recheados e combinações diferentes para experimentar no seu ritmo.",
    "days": [
      {
        "name": "Segunda-feira",
        "meals": {
          "cafe": "torrada-de-pera-e-gorgonzola",
          "almoco": "merluza-com-tomate",
          "lanche": "bolinho-de-batata-doce-com-sardinha",
          "jantar": "sufle-de-couve-flor",
          "sobremesa": "creme-de-coco-assado"
        }
      },
      {
        "name": "Terça-feira",
        "meals": {
          "cafe": "muffin-de-cenoura-e-laranja",
          "almoco": "lombo-suino-com-laranja",
          "lanche": "palitos-de-cenoura-com-cominho",
          "jantar": "quiche-de-cogumelos",
          "sobremesa": "goiaba-assada-com-queijo"
        }
      },
      {
        "name": "Quarta-feira",
        "meals": {
          "cafe": "aveia-assada-com-pera",
          "almoco": "rolinhos-de-frango-com-cenoura",
          "lanche": "pastel-de-ricota-e-espinafre",
          "jantar": "escondidinho-de-batata-e-lentilha",
          "sobremesa": "crumble-de-manga"
        }
      },
      {
        "name": "Quinta-feira",
        "meals": {
          "cafe": "panquequinha-de-maca-e-aveia",
          "almoco": "hamburguer-de-peixe",
          "lanche": "espetinho-de-queijo-coalho",
          "jantar": "torta-pequena-de-cogumelo",
          "sobremesa": "biscoito-de-limao"
        }
      },
      {
        "name": "Sexta-feira",
        "meals": {
          "cafe": "paozinho-de-tomate-e-manjericao",
          "almoco": "almondega-bovina-com-parmesao",
          "lanche": "minipizza-de-frango",
          "jantar": "chuchu-recheado-com-atum",
          "sobremesa": "ameixa-assada-com-canela"
        }
      },
      {
        "name": "Sábado",
        "meals": {
          "cafe": "bolo-pequeno-de-coco",
          "almoco": "coxa-com-paprica-defumada",
          "lanche": "folhado-de-pera-e-chocolate",
          "jantar": "pizza-individual-de-abobora",
          "sobremesa": "tortinha-de-morango-cozido"
        }
      },
      {
        "name": "Domingo",
        "meals": {
          "cafe": "sanduiche-de-queijo-e-goiabada",
          "almoco": "costelinha-suina-pre-cozida",
          "lanche": "chips-de-banana-da-terra",
          "jantar": "feijao-branco-gratinado",
          "sobremesa": "brownie-de-cafe"
        }
      }
    ]
  }
];
const EXTRA_IDEAS = [
  {
    "id": "ideia-5",
    "title": "Café da manhã em dupla",
    "description": "Pão de queijo com uma fruta aquecida para dividir.",
    "recipeIds": [
      "pao-de-queijo-tradicional",
      "banana-assada-com-canela"
    ]
  },
  {
    "id": "ideia-6",
    "title": "Lanche com o que está pronto",
    "description": "Use frango já cozido e complete com chips em pequenas rodadas.",
    "recipeIds": [
      "sanduiche-de-frango-cremoso",
      "chips-de-cenoura"
    ]
  },
  {
    "id": "ideia-7",
    "title": "Almoço clássico",
    "description": "Sirva o frango e a batata em rodadas separadas para manter a crosta.",
    "recipeIds": [
      "frango-empanado-crocante",
      "batata-rustica-com-paprica"
    ]
  },
  {
    "id": "ideia-8",
    "title": "Peixe com legumes",
    "description": "Prepare primeiro os legumes e faça o peixe perto da hora de servir.",
    "recipeIds": [
      "tilapia-com-limao-e-alho",
      "abobrinha-com-pimentao"
    ]
  },
  {
    "id": "ideia-9",
    "title": "Jantar de torta e vegetais",
    "description": "Uma torta pequena com vegetais assados para completar.",
    "recipeIds": [
      "torta-pequena-de-frango",
      "brocolis-com-alho"
    ]
  },
  {
    "id": "ideia-10",
    "title": "Lanche sem carne",
    "description": "Dois preparos de legumes e grãos para variar os petiscos.",
    "recipeIds": [
      "bolinho-de-grao-de-bico-e-cenoura",
      "palmito-assado-com-ervas"
    ]
  },
  {
    "id": "ideia-11",
    "title": "Almoço com carne moída",
    "description": "Discos caseiros e acompanhamento de raízes. Confira a temperatura interna do hambúrguer.",
    "recipeIds": [
      "hamburguer-bovino-classico",
      "mix-de-raizes"
    ]
  },
  {
    "id": "ideia-12",
    "title": "Sobremesa para compartilhar",
    "description": "Faça o bolo em forma pequena e aqueça a fruta depois.",
    "recipeIds": [
      "bolo-pequeno-de-chocolate",
      "pera-com-chocolate"
    ]
  },
  {
    "id": "ideia-13",
    "title": "Café da manhã com aveia",
    "description": "Uma porção assada e granola para servir separadamente.",
    "recipeIds": [
      "aveia-assada-com-banana",
      "granola-de-amendoim"
    ]
  },
  {
    "id": "ideia-14",
    "title": "Jantar de inspiração vegetariana",
    "description": "Lentilha em duas texturas, com vegetais assados como complemento.",
    "recipeIds": [
      "hamburguer-de-lentilha-e-aveia",
      "berinjela-com-tomate"
    ]
  },
  {
    "id": "ideia-15",
    "title": "Almoço com frango e abóbora",
    "description": "Cubos de frango e abóbora combinam; faça rodadas para conferir os pontos.",
    "recipeIds": [
      "frango-em-cubos-com-curry",
      "abobora-cabotia-em-cubos"
    ]
  },
  {
    "id": "ideia-16",
    "title": "Petiscos de fim de semana",
    "description": "Bolinhos e queijo em espetinhos para porções pequenas.",
    "recipeIds": [
      "bolinho-de-arroz-com-parmesao",
      "espetinho-de-queijo-coalho"
    ]
  },
  {
    "id": "ideia-17",
    "title": "Peixe com batata dourada",
    "description": "Peixe delicado e batata amassada crocante, preparados separadamente.",
    "recipeIds": [
      "pescada-com-ervas",
      "batata-amassada-crocante"
    ]
  },
  {
    "id": "ideia-18",
    "title": "Lanche doce e salgado",
    "description": "Uma versão salgada e uma doce de pastel, em rodadas distintas.",
    "recipeIds": [
      "pastel-de-palmito-cremoso",
      "pastel-de-maca-cozida"
    ]
  },
  {
    "id": "ideia-19",
    "title": "Domingo caseiro",
    "description": "Escondidinho gratinado seguido de fruta assada.",
    "recipeIds": [
      "escondidinho-de-mandioca-e-frango",
      "abacaxi-com-coco"
    ]
  },
  {
    "id": "ideia-20",
    "title": "Reaproveite arroz com cuidado",
    "description": "Arroz já cozido vira prato principal ou bolinho. Use sobras bem refrigeradas e reaqueça a 74 °C.",
    "recipeIds": [
      "arroz-de-forno-com-legumes",
      "bolinho-de-arroz-com-parmesao"
    ]
  },
  {
    "id": "ideia-21",
    "title": "Reaproveite frango com cuidado",
    "description": "Use frango já cozido e refrigerado em dois preparos diferentes; reaqueça a 74 °C.",
    "recipeIds": [
      "torta-pequena-de-frango",
      "pastel-de-frango-e-milho"
    ]
  },
  {
    "id": "ideia-22",
    "title": "Lanche de assados pequenos",
    "description": "Muffins e pão rápido em porções para dividir.",
    "recipeIds": [
      "muffin-salgado-de-abobrinha",
      "paozinho-de-ricota"
    ]
  },
  {
    "id": "ideia-23",
    "title": "Almoço com carne suína",
    "description": "Lombo em porções com cenoura aromática.",
    "recipeIds": [
      "lombo-suino-com-mostarda",
      "cenoura-com-laranja"
    ]
  },
  {
    "id": "ideia-24",
    "title": "Jantar com grãos",
    "description": "Abóbora recheada e bolinhos de feijão branco para variar.",
    "recipeIds": [
      "abobora-recheada-com-grao-de-bico",
      "bolinho-de-feijao-branco-e-couve"
    ]
  },
  {
    "id": "ideia-25",
    "title": "Café da manhã salgado",
    "description": "Ovo em cestinha acompanhado de uma torrada leve.",
    "recipeIds": [
      "cestinha-de-pao-com-ovo",
      "torrada-de-tomate-com-manjericao"
    ]
  },
  {
    "id": "ideia-26",
    "title": "Duas ideias com banana",
    "description": "Use banana madura em aveia assada ou como recheio de tortinha.",
    "recipeIds": [
      "aveia-assada-com-banana",
      "tortinha-de-banana"
    ]
  },
  {
    "id": "ideia-27",
    "title": "Noite de pizzas individuais",
    "description": "Duas coberturas, com cada base preparada na sua própria rodada.",
    "recipeIds": [
      "pizza-individual-de-brocolis",
      "pizza-individual-de-palmito"
    ]
  },
  {
    "id": "ideia-28",
    "title": "Lanche com grão-de-bico",
    "description": "Uma versão crocante e outra moldada em bolinhos.",
    "recipeIds": [
      "grao-de-bico-crocante",
      "bolinho-de-grao-de-bico-e-cenoura"
    ]
  },
  {
    "id": "ideia-29",
    "title": "Almoço com salmão",
    "description": "Peixe em porções com legumes assados e tempero simples.",
    "recipeIds": [
      "salmao-com-gergelim",
      "vagem-com-gergelim"
    ]
  },
  {
    "id": "ideia-30",
    "title": "Sobremesas em porções",
    "description": "Creme assado para servir frio e fruta com cobertura crocante. Planeje o tempo de refrigeração.",
    "recipeIds": [
      "creme-de-baunilha-assado",
      "crumble-de-maca"
    ]
  }
];
