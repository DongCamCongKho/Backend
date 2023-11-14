

function registerValidate(req,res,next)
{
    const {name,age,email,password } = req.body;
    const regexName = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let errors = [];
    if(!name  || !email || !password)
    {
        errors.push("Please fill all the fields")
    }
    if(name && !regexName.test(name))
    {
        errors.push("Name is not valid")
    }

    if(email && !regexEmail.test(email))
    {
        errors.push("Email is not valid")
    }
    if(errors.length > 0)
    {
        res.status(400).send(errors)
    }
    else
    {
        next()
    }
    
}


module.exports = {registerValidate};