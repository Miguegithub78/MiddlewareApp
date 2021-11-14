const { Juniors, Company, Publication, Admins, Notifications, Jobs} = require ('../../models/index');

const getNotification = async (req, res) => {

  const { id } = req.params; //_id de la publicacion o el job
  const { userId, idFireBase } = req.body; //_id del usuario que da click en publicacion o job

  if (!id || !userId) {
    return res.status(400).json({message: 'Id not founded'});
  }

  const userJunior = await Juniors.findOne({_id: userId});
  const userCompany = await Company.findOne({_id: userId});
  console.log(userCompany);
  if (!userJunior || userJunior === null) {
    const userCompany = await Company.findOne({_id: userId});
    if (!userCompany || userCompany === null) {
      return res.status(400).json({message: 'User not founded'
      });
    }
  }    
  const publication = await Publication.findById(id);
  const job = await Jobs.findById(id);
  if (!publication && !job) {
    return res.status(400).json({message: 'Publication or job not founded'
    })}

    if(!job){

    const notificationData = {
      description: publication.description,
      userPublicationId: publication.junior ? publication.junior : publication.company, // _id del usuario que publico
      userNotificationId: userJunior ? userJunior : userCompany, // _id del usuario que esta clickeando en la publicacion
      userNotification: userJunior.name ? userJunior.name || 'no data' : userCompany.name || 'no data', // nombre del usuario que clickea la notificacion
      type: 1,
      createdAt: new Date(),
    };
    try {
    const notification = await Notifications.create(notificationData);

    res.status(200).json(notification);
  }
  catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
  }
  else{

    const notificationData = {
      description: job.title,
      userJobId: job.company,// id de la company que publico el job
      userNotificationId: userJunior ? userJunior : userCompany, // _id del usuario que esta clickeando en el job
      userNotification: userJunior.name ? userJunior.name || 'no data' : userCompany.name || 'no data', // nombre del usuario que clickea la notificacion esto da error por ahi estoy viendo q es
      type: 2,
      createdAt: new Date(),
    };
    try {
    const notification = await Notifications.create(notificationData);

    res.status(200).json(notification);
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }}

};

  module.exports = { getNotification };