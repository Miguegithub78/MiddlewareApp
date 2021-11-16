const {
  Order
} = require ('../../models/index')

const mercadopago = require("mercadopago");

const { ACCESS_TOKEN } = process.env;

mercadopago.configure({
	access_token: ACCESS_TOKEN,
});

const create_preference = async (req, res) => {
  // try{
    const { companyId } = req.query;

    const carrito = [
      {
        id: 1,
        title: "Standar",
        quantity: 1,
        unit_price: 600,
        picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif"
      },
      {
        id: 2,
        title: "Premium",
        quantity: 1,
        unit_price: 900,
        picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif"
        
      }
    ]

    const productos = carrito.map(p => ({

      title: p.title,
      quantity: p.quantity,
      unit_price: p.unit_price
    }))
/*{
  title: req.body.description,
  unit_price: Number(req.body.price),
  quantity: Number(req.body.quantity),
}*/
	let preference = {
		items: productos,
    external_reference: `${companyId}`,
    notification_url: "https://hookb.in/VGLVqnXx0qHDrgoorlzJ",
    payment_methods: {
      excluded_payment_types: [{
        id: "ticket"
      }],
      excluded_payment_methods: [{
        id: "atm"
      }],
      installments: 12, //cant de cuotas
      default_payment_method_id: "visa",
      default_installments: 12
    },
		back_urls: {
			"success": "http://localhost:3001/feedback",
			"failure": "http://localhost:3001/feedback",
			"pending": "http://localhost:3001/feedback"
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
      console.info('Se crea preferencia');
      // console.log(response.body);
			res.send(response.body.id);
		}).catch(function (error) {
			console.log(error);
		});

    
  // } catch (error) {
  //     res.status(404).json({ error: error.message });
  // }
}

const orderFeedback = async (req, res) => {
  try{
    
    const { payment_id, payment_status, merchant_order_id } = req.query;
    console.log(req.query);
    
    res.json({
      payment_id: req.query.payment_id,
      payment_status: req.query.payment_status,
      status: req.query.status,
      merchant_order_id: req.query.merchant_order_id,
      date_created: req.query.date_created,
    });

    const companyPremium = Company.findOne({ _id : req.query.external_reference })

    // .catch(function (error) {
    //   console.log(error);
    //   //return res.redirect(`http://localhost:3001/feedback/?error=${error}`); //se puede modificar para el front con la ruta del error que quiera
    // })
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
}

module.exports = {
  create_preference,
  orderFeedback
}