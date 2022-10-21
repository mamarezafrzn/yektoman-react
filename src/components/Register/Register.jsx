import logo from "../../assets/img/logo_small.png";
import styles from "./Register.module.css"

const Register = () =>{
    return(
        <div className={styles["main-container"]}>
        <div className={styles["card-container"]}>
          <div className={styles["logo-container"]}>
            <img src={logo} alt="..." className={styles.logo} />
          </div>
          <hr className="hr-dashed m-0" />
          <div className={styles["form-container"]}>
            <form action="" className={styles["login-form"]}>
              <label htmlFor="name">نام</label>
              <br />
              <input id="name" type="text" placeholder="نام خود را وارد کنید" />
              <label htmlFor="family">نام خانوادگی</label>
              <br />
              <input id="family" type="text" placeholder="نام خانوادگی خود را وارد کنید" />
              <label htmlFor="national_code">کدملی</label>
            <br />
            <input type="text" id="national_code" placeholder="کد ملی خود را وارد کنید" />
            <label htmlFor="mobile">شماره همراه</label>
            <br />
            <input type="text" id="mobile" placeholder=" شماره همراه خود را وارد کنید" />
            
            <label className={styles['forms-checkbox-label']} htmlFor="rules">با قوانین سایت موافق می باشم
            <input className={styles['forms-checkbox']} type="checkbox" name="rules" id="rules" />
            </label>
              <button type="submit" className={styles["login-btn"]}>
               ثبت نام
              </button>
            </form>
          </div>
        </div>
      </div>

// <div className="bmd-layout-container bmd-drawer-f-l avam-container animated ">
//     <main className="bmd-layout-content">
//         <div className="container-fluid">
//             <div className="main_wrapper">


    

//                 <div className="row ">
//                     <div className="col-md-5 card shade mw-center mh-center">
//                         <img src={logo} alt="..." className="mw-center " />
//                         <hr className="hr-dashed m-0"/>
//                         <form>
//                             <div className="form-group m-0">
//                                 <label for="exampleInputName1">نام</label>
//                                 <input type="text" className="form-control @error('user.name')
//                                     is-invalid @enderror" id="exampleInputName1"
                                       
//                                        aria-describedby="nameHelp" placeholder="نام"/>
//                                 <small id="nameHelp" className="form-text text-muted">نام خود را به فارسی وارد کنید</small>
//                                 <div className="text-danger text-right mt-2">
                                   
//                                 </div>
//                             </div>
//                             <div className="form-group m-0">
//                                 <label for="exampleInputFullName1">نام خانوادگی</label>
//                                 <input type="text" className="form-control @error('user.family')
//                                     is-invalid @enderror" id="exampleInputFullName1"
                                       
//                                        aria-describedby="fullnameHelp" placeholder="نام خانوادگی"/>
//                                 <small id="fullnameHelp" className="form-text text-muted">نام خانوادگی خود را به فارسی وارد کنید</small>
//                                 <div className="text-danger text-right mt-2">
                        
//                                 </div>
//                             </div>
//                             <div className="form-group m-0">
//                                 <label for="exampleInputNationalCode1">کدملی</label>
//                                 <input type="text" className="form-control @error('user.national_code')
//                                     is-invalid @enderror" id="exampleInputNationalCode1"
//                                         placeholder="کد ملی خود را وارد کنید"/>
//                                 <div className="text-danger text-right mt-2">
                          
//                                 </div>
//                             </div>
//                             <div className="form-group m-0">
//                                 <label for="exampleInputPMobile1">شماره همراه</label>
//                                 <input type="text" className="form-control @error('user.mobile')
//                                     is-invalid @enderror" id="exampleInputPMobile1"
                                     
//                                        placeholder="شماره همراه خود را وارد کنید"/>
//                                 <div className="text-danger text-right mt-2">
                               
                               
//                                 </div>
//                             </div>
//                             <div className="form-check pt-2">
//                                 <input type="checkbox" className="form-check-input @error('user.rule')
//                                     is-invalid @enderror" id="exampleCheck1"
                                      

//                                 />

//                                 <label className="form-check-label" for="exampleCheck1">با قوانین سایت موافق می باشم</label>

//                             </div>
//                             <button type="submit" className="btn shade f-primary btn-block text-center">ثبت نام</button>
//                         </form>
//                     </div>

//                 </div>



//             </div>

//         </div>
//     </main>
// </div>

    )
}

export default Register