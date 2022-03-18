export default async function handler (req, res) {
  if(req.method == 'POST') {

    console.log(req.body)


    res.status(200).json({result, dataProduct});

  }else{
    res.status(200).send(req.method);
  }
}