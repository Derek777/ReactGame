var Images = [];
function getImages(){
    for(var i =0; i<2;i++){
        for(var k =1; k<9; k++){
            if(i===0){
                var img= {
                    path: './img/'+k+'.jpg',
                    data: 'img_'+k
                };
                Images.push(img);
            }else{
                img={
                    path: './img/'+k+'.jpg',
                    data: 'img_'+k
                };
                Images.push(img);
            }
        }
    }
}
getImages();

Array.prototype.IMG_MIXING = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random()*(i+1));
        temp = this[j];
        this[j]= this[i];
        this[i]= temp;
    }
};//перемішую картинки

Images.IMG_MIXING();

var Board  = React.createClass({
    getInitialState: function(){
        return {
            containers: (new Array(16)).fill('available')
        };
    },

    mass: [],

    getPair: function(){
        var Cardss = this.state.containers;
      if(this.mass[0].data===this.mass[1].data){
          document.getElementById(this.mass[0].target).firstChild.className="sel";
          document.getElementById(this.mass[1].target).firstChild.className="sel";
          this.mass=[];
          var count=0;
          for(var j=0; j<Cardss.length; j++){
              if(Cardss[j]==='available'){
                  count+=1;
              }
          }
          if(count===0){
              Images.IMG_MIXING();
              this.setState({containers: (new Array(16)).fill('available')});
          }
      }else{
          Cardss[this.mass[0].target]='available';
          Cardss[this.mass[1].target]='available';
          this.setState({containers: Cardss});
          this.mass=[];
      }
    },

    onContainerClick: function(e){
        var num = e.target.getAttribute("id");// id 0-15
        var Cards = this.state.containers;// мій стейт масив
        var st = Cards[num];//елемент стейту
        var newSt = st==='available' ? 'selected' : 'available';
        var img = {
                     target: num,
                     data: e.target.firstChild.getAttribute("data-img")
                  };
        if(this.mass.length===0){
            Cards[num]=newSt;
            this.mass.push(img);
            this.setState({containers: Cards});
        }else if(this.mass.length===1){
            Cards[num]=newSt;
            this.mass.push(img);
            this.setState({containers: Cards});
            setTimeout(this.getPair, 1200);
        }
    },

    render: function() {
        var containers = this.state.containers;
        var elements = containers.map((el, index) =>{
            return <div key={index} id={index} onClick={this.onContainerClick} className={containers[index]}>
                <img key={index} src={Images[index].path} data-img={Images[index].data} className={'img'+containers[index]} />
            </div>
        });
        return <div>
            {elements}
        </div>
    }
});

ReactDOM.render(
    <Board />,
    document.getElementById('board')
);
