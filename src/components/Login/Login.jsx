



const Login = () =>{

    return(
        
<div className="bmd-layout-container bmd-drawer-f-l avam-container animated ">
    <main className="bmd-layout-content">
        <div className="container-fluid">
            <div className="main_wrapper">


                <div className="row ">
                    <div className="col-md-5 card shade mw-center mh-center">
                        <img src="./logo_small.png" alt="..." className="mw-center "  />
                        <hr className="hr-dashed m-0"/>
                        <form>
                            <div className="form-group m-5">
                                <label for="exampleInputNationalCode1">کدملی</label>
                                <input type="text" className="form-control @error('user.national_code')
                                    is-invalid @enderror" id="exampleInputNationalCode1"
                                       placeholder="کد ملی خود را وارد کنید"/>
                                <div className="text-danger text-right mt-2">
                                    {/* @error('user.national_code') */}
                                    <strong>
                                        {/* {{ $message }} */}
                                        </strong>
                                    {/* @enderror */}
                                </div>
                            </div>

                        </form>
                        <div className="form-group ml-5 align-center">
                            <button type="submit" className="btn shade f-primary btn-lg text-center" >ورود با رمز یکبار مصرف</button>
                            <button type="submit" className="btn shade f-primary btn-lg text-center"> ورود با رمز عبور</button>
                        </div>
                    </div>

                </div>



            </div>

        </div>
    </main>
</div>

    )
}

export default Login