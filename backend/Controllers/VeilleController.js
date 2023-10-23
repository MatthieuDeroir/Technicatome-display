const VeilleSchema = require("../Models/VeilleModel");

exports.getVeille = async (req, res) => {
  try {
    const veilles = await VeilleSchema.find({});
    res.status(200).send(veilles);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};


exports.updateVeille = async (req, res) => {
  try {
    console.log("updateVeille");
    const veilleUpdated = await VeilleSchema.findOneAndUpdate(
      {},
      req.body,
      { new: true } // Cette option fait en sorte que la méthode renvoie le document modifié
    );
    if (!veilleUpdated) {
      res.status(404).send("Aucune veille trouvée avec cet ID");
    } else {
      res.json(veilleUpdated);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
