export function HandlerError(toastController:any,err?:any | null){

    toastController.create({
        duration:1500,
        message: err && err.error && err.error.message?err.error.message:'something is wrong !',
        position: 'top',
        cssClass: 'toast-custom-class-warn',
        buttons: [
          {
            side: 'end',
            icon: 'close-outline',
          }, 
        ]
      }).then((toast:any) => {
        toast.present();
      });

}
export function SuccessHandlor(toastController:any,message?:string|null){

  toastController.create({
      duration:1500,
      message: message?message:'object created successfully !',
      position: 'top',
      cssClass: 'toast-custom-class-success',
      buttons: [
        {
          side: 'end',
          icon: 'close-outline',
        }, 
      ]
    }).then((toast:any) => {
      toast.present();
    });

}