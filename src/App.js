import React from 'react'
import {useState, useEffect} from 'react'
import {getQuotes} from './services/Quote'
import {createUseStyles} from 'react-jss'
import './index.css' // box sizing and stuff

const useStyles = createUseStyles({
    container: {
        width: '100%',
        height: '100%',

        '& *': {
            margin: 0
        }
    },
    quoteBox: {
        // center
        border: '2px solid red',
        position: 'absolute',
        top: '30%',
        left: '25%',
        // size 
        width: '50%',
        height: '40%',
        // center inside
        padding: '20px',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})


const App = () => {
    const [currQuote, setCurrQuote] = useState(null)
    const [quotes, setQuotes] = useState([])

    const styles = useStyles()

    // initialize quotes and currentQuote
    useEffect(() => {
        getQuotes()
            .then(quotes => {
                setQuotes(quotes)
                const index = Math.floor(Math.random() * (quotes.length - 1))
                setCurrQuote(quotes[index])
            })
    }, [])

    // Move to another random quote
    const newQuote = evt => {
        evt.preventDefault()
        const index = Math.floor(Math.random() * (quotes.length - 1))
        setCurrQuote(quotes[index])
    }

    if(currQuote) 
        return (
            <div className={styles.container}>
                <div className={styles.quoteBox}>
                    <h1>{currQuote.quote}</h1>
                    <p>- {currQuote.author}</p>
                    <button onClick={newQuote}>New Quote</button>
                </div>
            </div>
        )
    
    // TODO: throw 404
    return null
}

export default App
