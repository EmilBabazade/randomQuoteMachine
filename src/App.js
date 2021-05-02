import React from 'react'
import {useState, useEffect} from 'react'
import {getQuotes} from './services/Quote'



const App = () => {
    const [currQuote, setCurrQuote] = useState(null)
    const [quotes, setQuotes] = useState([])

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
            <div>
                <h1>{currQuote.quote}</h1>
                <p>{currQuote.author}</p>
                <button onClick={newQuote}>New Quote</button>
            </div>
        )
    
    // TODO: throw 404
    return null
}

export default App
