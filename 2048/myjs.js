
document.addEventListener('DOMContentLoaded',() =>
{
    const gridDisplay = document.querySelector(".grid")
    const scoreDisplay = document.getElementById("score")
    const resultDisplay = document.getElementById("result")
    const width=4
    let squares= []
    let score=0


    //create a playing Board
    function CreateBoard()
    {
        for (let i=0 ; i < width*width ; i++)
        {
            let square = document.createElement('div')
            square.innerHTML=0
            gridDisplay.appendChild(square)
            squares.push(square)

        }
        generate()
    }
    CreateBoard()



    function generate()
    {
        let RandomNumber=Math.floor(Math.random()*squares.length)
        if(squares[RandomNumber].innerHTML==0)
        {
            let or2_4=Math.random();
            if(or2_4<0.5)
            {
                squares[RandomNumber].innerHTML=2;  
            }
            else
            {
                squares[RandomNumber].innerHTML=4;
            }
            checkForGameOver()
            
        }
        else
        {
            generate()
        }
    }

    //move right
    function moveRight()
    {
        for(let i=0;i< 16;i++)
        {
            if(i%4==0)
            {
                let one =squares[i].innerHTML;
                let two=squares[i+1].innerHTML;
                let three=squares[i+2].innerHTML;
                let four=squares[i+3].innerHTML;
                let row= [parseInt(one), parseInt(two) , parseInt(three) , parseInt(four)]

                console.log(row)

                let filterRow=row.filter(num => num)
                console.log(filterRow)
                let missing=4-filterRow.length
                let zeros=Array(missing).fill(0)
                console.log(zeros)
                let newRow=zeros.concat(filterRow)
                console.log(newRow)

                squares[i].innerHTML=newRow[0]
                squares[i+1].innerHTML=newRow[1]
                squares[i+2].innerHTML=newRow[2]
                squares[i+3].innerHTML=newRow[3]

            }
        }
    }
    


        //move Left
        function moveLeft()
        {
            for(let i=0;i< 16;i++)
            {
                if(i%4==0)
                {
                    let one =squares[i].innerHTML;
                    let two=squares[i+1].innerHTML;
                    let three=squares[i+2].innerHTML;
                    let four=squares[i+3].innerHTML;
                    let row= [parseInt(one), parseInt(two) , parseInt(three) , parseInt(four)]
    
                    console.log(row)
    
                    let filterRow=row.filter(num => num)
                    console.log(filterRow)
                    let missing=4-filterRow.length
                    let zeros=Array(missing).fill(0)
                    console.log(zeros)
                    let newRow=filterRow.concat(zeros)
                    console.log(newRow)
    
                    squares[i].innerHTML=newRow[0]
                    squares[i+1].innerHTML=newRow[1]
                    squares[i+2].innerHTML=newRow[2]
                    squares[i+3].innerHTML=newRow[3]
    
                }
            }
        }
        
        // move down
        function moveDown()
        {
            for(let i=0; i<4; i++)
            {
                let totalOne= squares[i].innerHTML
                let totalTwo=squares[i+width].innerHTML
                let totalThree =squares[i+(width*2)].innerHTML
                let totalFour= squares[i+ (width*3)].innerHTML
                let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filtercolumn= column.filter(num=>num)
                let missing = 4-filtercolumn.length
                let zeros = Array(missing).fill(0)
                let newColumn=zeros.concat(filtercolumn)

                squares[i].innerHTML=newColumn[0]
                squares[i+width].innerHTML=newColumn[1]
                squares[i+(width*2)].innerHTML=newColumn[2]
                squares[i+(width*3)].innerHTML=newColumn[3]

            }
        }

           // move up
           function moveUp()
           {
               for(let i=0; i<4; i++)
               {
                   let totalOne= squares[i].innerHTML
                   let totalTwo=squares[i+width].innerHTML
                   let totalThree =squares[i+(width*2)].innerHTML
                   let totalFour= squares[i+ (width*3)].innerHTML
                   let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
   
                   let filtercolumn= column.filter(num=>num)
                   let missing = 4-filtercolumn.length
                   let zeros = Array(missing).fill(0)
                   let newColumn=filtercolumn.concat(zeros)
   
                   squares[i].innerHTML=newColumn[0]
                   squares[i+width].innerHTML=newColumn[1]
                   squares[i+(width*2)].innerHTML=newColumn[2]
                   squares[i+(width*3)].innerHTML=newColumn[3]
                   
               }
           }

        function combineRow()
        {
            for(let i=0; i<15; i++)
            {
                if(squares[i].innerHTML === squares[i+1].innerHTML)
                {
                    let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                    squares[i].innerHTML=combinedTotal
                    squares[i+1].innerHTML=0
                    score=score+combinedTotal
                    scoreDisplay.innerHTML=score
                }
            }
            checkForWin()
        }

        function combineColumn()
        {
            for(let i=0; i<12; i++)
            {
                if(squares[i].innerHTML === squares[i+width].innerHTML)
                {
                    let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
                    squares[i].innerHTML=combinedTotal
                    squares[i+width].innerHTML=0
                    score=score+combinedTotal
                    scoreDisplay.innerHTML=score
                }
            }
            checkForWin()
        }

        function control(e)
        {
            if(e.which === 39)
            {
                keyRight()
            }
            else if(e.which === 37)
            {
                keyLeft()
            }
            else if(e.which === 38)
            {
                keyUp()
            }
            else if(e.which === 40)
            {
                keyDown()
            }
        }

        document.addEventListener('keyup', control)

        function keyRight()
        {
            moveRight()
            combineRow()
            moveRight()
            generate()
        }

        function keyLeft()
        {
            moveLeft()
            combineRow()
            moveLeft()
            generate()
        }

        function keyDown()
        {
            moveDown()
            combineColumn()
            moveDown()
            generate()
        }

        function keyUp()
        {
            moveUp()
            combineColumn()
            moveUp()
            generate()
        }


        //check for the number 2048
        function checkForWin()
        {
            for(let i=0; i< squares.length ; i++)
            {
                if(squares[i].innerHTML == 2048)
                {
                    resultDisplay.innerHTML= 'YOU WIN !!!  &#127882'
                    resultDisplay.style.border="  #cc9900 solid 2px"
                    resultDisplay.style.background='linear-gradient(#ffc61a,#cc9900)'
                    document.removeEventListener('keyup' , control)
                }
            }
        }

        function checkForGameOver()
        {
            let zeros=0 
            for( let i=0; i<squares.length ;i++)
            {
                if(squares[i].innerHTML == 0)
                {
                    zeros++
                }
            }
            if(zeros === 0)
            {
                resultDisplay.innerHTML="OOOPSS! YOU LOSE  &#128543"
                
                document.removeEventListener('keyup', control)
            }

        }

})
const reloadtButton = document.querySelector("#reload");
        function reload() 
        {
        reload = location.reload();
        }

        reloadButton.addEventListener("click", reload, false);
