import { LightningElement } from 'lwc';
const CRV_VARIANTS = [
    {
      variant:"VTi",
      price:38900,
      formattedPrice:"$38,900",
      fuelConsumption:7,
      seatingCapacity:5,
      allowWheels:17,
      checked:true,
      imageName:"ignite_red"
    },
    {
      variant:"VTi 7",
      formattedPrice:"$40,900",
      price:40900,
      fuelConsumption:7.3,
      seatingCapacity:7,
      allowWheels:17,
      imageName:"ignite_red"
    },
    {
      variant:"VTi X",
      formattedPrice:"$41,900",
      price:41900,
      fuelConsumption:7.3,
      seatingCapacity:5,
      allowWheels:18,
      imageName:"ignite_red"
    },
    {
      variant:"VTi LX AWD",
      formattedPrice:"$53,600",
      price:53600,
      fuelConsumption:7.4,
      seatingCapacity:5,
      allowWheels:19,
      imageName:"ignite_red"
    }
  ]

  //Colors for car selection
 const COLORS = [
    {label:"Ignite Red (Metallic)", value:"ignite_red", checked:true},
    {label:"Brilliant Sporty Blue", value:"sporty_blue"},
    {label:"Crystal Black", value:"crystal_black"},
    {label:"Platinum White (Pearlescent)", value:"platinum_white"}
  ]
  const ANIMATED_STARTING_PRICE = 38000

export default class BuildAndPrice extends LightningElement {
       showModal=false
       crvVariants = CRV_VARIANTS;
       colorList=COLORS
       selectedVariant = CRV_VARIANTS[0];
       selectedPrice=this.selectedVariant.price;
       selectedImageName = this.colorList[0].value
       selectedColorName = this.colorList[0].label
       animatedPriceValue

       connectedCallback(){
        this.animatePrice()
       }
       

       // Handler for when a variant is selected
       selectionHandler(event){
        // console.log("selected", event.detail.variant);
        // console.log("selected", event.detail.selected);
        const {selected, variant }= event.detail
        // when we change the color then the color should stick to the selection until we change the color
        this.selectedVariant = {...selected, imageName: this.selectedImageName}
        this.selectedPrice = this.selectedVariant.price
        this.updateVariants(variant)
        this.animatePrice()
       }

      // handler when color is selected
       colorSelectionHandler(event){
        console.log("color selected", event.detail); 
        this.selectedImageName = event.detail 
        this.selectedVariant = {...this.selectedVariant, imageName: this.selectedImageName}
        this.updateColors(this.selectedImageName)

       }

       //update the 'checked' property for the colors based on the selected value
       //doubt--> how to read this
       updateColors(value){
          this.colorList = this.colorList.map(item=>{
           let checked = item.value === value
           if(checked){
            this.selectedColorName= item.label
           }
             return  { ...item, checked}
          })
        }

        
       //update the 'checked' property for the variant based on the selected value
          updateVariants(value){
            this.crvVariants = this.crvVariants.map(item=> {
            let checked = item.variant === value
            return {...item, checked}
            }  

            )
          }

         //open the modal
          openModalHandler(){
              this.showModal =true
          }
           
          cancelButtonHandler(){
            this.showModal= false
          }

          //method to animate the price
          animatePrice(){
              this.animatedPriceValue = ANIMATED_STARTING_PRICE
             let interval = window.setInterval(() => {
                if(this.selectedPrice!==this.animatedPriceValue){
                  this.animatedPriceValue = this.animatedPriceValue + 100
                }
                else{
                  window.clearInterval(interval)
                }
              }, 10); 
              
          } 

}