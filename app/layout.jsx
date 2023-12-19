import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
    title: 'Quotes',
    description: 'Discover and share your qoutes with friends.'
} 
const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <head>
        <link
            rel="icon"
            href="/assets/images/logo.png"
            type="image/png"
        />
        </head>
        <body className='pb-5'>
            <Provider >
                <div className='main'>
                    <div className="gradient" />
                </div>

                <main className="app">
                    <Nav/>
                    {children}
                </main>
            </Provider>
        </body>
        
    </html>
  )
}

export default RootLayout
