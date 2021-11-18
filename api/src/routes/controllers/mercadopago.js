const { Jobs } = require("../../models/index");

const mercadopago = require("mercadopago");

const { ACCESS_TOKEN } = process.env;

mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

const create_preference = async (req, res) => {
  // try{
  const { idJob } = req.params;
  const { plan } = req.query;
  let product;

  if (plan === "premium") {
    // const order = await Order.findOne({ _id: idJob });
    // const { price, user } = order;
    product = [
      {
        title: "Premium",
        quantity: 1,
        unit_price: 900,
      },
    ];
  } else {
    product = [
      {
        title: "Standard",
        quantity: 1,
        unit_price: 600,
      },
    ];
  }

  let preference = {
    items: product,
    external_reference: `${idJob}/${product[0].title}`,
    notification_url: "https://hookb.in/VGLVqnXx0qHDrgoorlzJ",
    payment_methods: {
      excluded_payment_types: [
        {
          id: "ticket",
        },
      ],
      excluded_payment_methods: [
        {
          id: "atm",
        },
      ],
      installments: 1, //cant de cuotas
      default_payment_method_id: "visa",
      default_installments: 1,
    },
    back_urls: {
      success: "http://localhost:3001/feedback",
      failure: "http://localhost:3001/feedback",
      pending: "http://localhost:3001/feedback",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      console.info("Se crea preferencia");
      console.log(response, "respuesta");
      // console.log(response.body);
      res.send({ id: response.body.id, product: product[0].title });
    })
    .catch(function (error) {
      console.log(error);
    });

  // } catch (error) {
  //     res.status(404).json({ error: error.message });
  // }
};

const orderFeedback = async (req, res) => {
  try {
    const {
      payment_id,
      payment_status,
      merchant_order_id,
      external_reference,
      status,
    } = req.query;
    console.log(req.query, "feedback");
    const reference = external_reference.split("/");
    const idJob = reference[0];
    const plan = reference[1];
    const level = plan === "Premium" ? 2 : 1;

    const job = await Jobs.findOneAndUpdate(
      { _id: idJob },
      {
        premium: level,
      },
      { new: true }
    );

    res.json({
      payment_id: req.query.payment_id,
      payment_status: req.query.payment_status,
      status: req.query.status,
      merchant_order_id: req.query.merchant_order_id,
      date_created: req.query.date_created,
    });

    // const companyPremium = Company.findOne({ _id : req.query.external_reference })

    // .catch(function (error) {
    //   console.log(error);
    //   //return res.redirect(`http://localhost:3001/feedback/?error=${error}`); //se puede modificar para el front con la ruta del error que quiera
    // })
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  create_preference,
  orderFeedback,
};
