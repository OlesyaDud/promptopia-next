import Nav from '@components/Nav';
import '@styles/globals.css';

export const metadata = {
    title: "Promptopia",
    description: "Discover and share AI prompts",
};

const RootLayout = ({children}) => {
  return (
    <html>
      <body>
        <div className='maine'>
            <div className='gradient'/>
            <main className='app'>
              <Nav />
                {children}
            </main>
        </div>
      </body>
    </html>
  )
};

export default RootLayout
