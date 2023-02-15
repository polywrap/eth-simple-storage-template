import './App.css';
import React from 'react';
import { PolywrapClient } from '@polywrap/client-js';
import { setupPolywrapClient } from './wrapper/setupClient';
import { setData } from './wrapper/simplestorage';
import Logo from './logo.png';
import { SIMPLE_STORAGE_CONTRACT_ADDRESS, WRAPPER_ENS_DOMAIN, WRAPPER_IPFS_HASH, WRAPPER_URI } from './constants';

interface Set {
  txReceipt: string;
  value: number;
}

function App() {
  const [client, setClient] = React.useState<PolywrapClient | undefined>(
    undefined
  );
  const [value, setValue] = React.useState<number>(0);
  const [sets, setSets] = React.useState<Set[]>([]);
  const addSet = (set: Set) => setSets([...sets, set]);

  const [inputValue, setInputValue] = React.useState<number>(0);

  const getClient = async () => {
    if (client) {
      return client;
    }

    const newClient = await setupPolywrapClient();
    setClient(newClient);
    return newClient;
  };

  const link = (url: string, children: () => JSX.Element) => (
    <a target='_blank' rel='noopener noreferrer' href={url}>
      {children()}
    </a>
  );

  const emoji = (symbol: string) => (
    <span role='img' aria-label={symbol}>
      {symbol}
    </span>
  );

  const codeSyntax = (type: string) => (children: () => JSX.Element) =>
    <text className={type}>{children()}</text>;

  const syntax = {
    class: codeSyntax('Code-Class'),
    prop: codeSyntax('Code-Prop'),
    value: codeSyntax('Code-Value'),
    string: codeSyntax('Code-String'),
    variable: codeSyntax('Code-Variable'),
  };

  return (
    <div className='App'>
      {link('https://polywrap.io/', () => (
        <img src={Logo} className='App-logo' />
      ))}
      <header className='App-body'>
        <h3 className='App-title'>
          Polywrap Demo:
          <br />
          {link(`https://app.ens.domains/name/${WRAPPER_ENS_DOMAIN}`, () => (
            <>api.simplestorage.eth</>
          ))}
          {link(
            `https://wrappers.io/v/ipfs/${WRAPPER_IPFS_HASH}`,
            () => (
              <> -&gt; IPFS</>
            )
          )}
        </h3>
        <br />
        <br />
          <>
            Storage Value: {value}
            <br />
            <input
              type='number'
              min='0'
              value={inputValue}
              style={{ width: '75px' }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputValue(Number(e.target.value))
              }
            />
            <button
              onClick={async () =>
                setData(SIMPLE_STORAGE_CONTRACT_ADDRESS, inputValue, await getClient())
                  .then((result) => {
                    addSet({
                      txReceipt: result,
                      value: inputValue,
                    });
                    setValue(inputValue);
                  })
                  .catch((err) => console.error(err))
              }
            >
              {emoji('📝')} Set Value
            </button>
            <div className='Code-Block'>
              {syntax.class(() => (
                <>client</>
              ))}
              .
              {syntax.prop(() => (
                <>invoke</>
              ))}
              {'({'}
              <br />
              {syntax.value(() => (
                <>&nbsp;&nbsp;&nbsp;&nbsp;uri: </>
              ))}
              {syntax.string(() => (
                <>"{ WRAPPER_URI }"</>
              ))}
              ,<br />
              {syntax.value(() => (
                <>&nbsp;&nbsp;&nbsp;&nbsp;method: </>
              ))}
              {syntax.string(() => (
                <>"setData"</>
              ))}
              ,<br />
              {syntax.value(() => (
                <>&nbsp;&nbsp;&nbsp;&nbsp;args: </>
              ))}
              {"{"}
              <br />
              {syntax.value(() => (
                <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;address: </>
              ))}
              {syntax.value(() => (
                <>{SIMPLE_STORAGE_CONTRACT_ADDRESS.substring(0, 5)}...{SIMPLE_STORAGE_CONTRACT_ADDRESS.substring(37, 42)}</>
              ))}
              <br />
              {syntax.value(() => (
                <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value: </>
              ))}
              {syntax.value(() => (
                <>{inputValue}</>
              ))}
              <br />
              <>&nbsp;&nbsp;&nbsp;&nbsp;{"}"}</>
              <br />
              {'})'}
            </div>
            <p>
              {sets.length ? (
                <>
                  Storage History:
                  <br />
                </>
              ) : (
                <></>
              )}
              {sets
                .map((set, index) => (
                  <>
                    #{index} | value: {set.value} | tx:{' '}
                    {link(
                      `https://goerli.etherscan.io/tx/${set.txReceipt}`,
                      () => (
                        <>{set.txReceipt.substring(0, 7)}...</>
                      )
                    )}
                    <br />
                  </>
                ))
                .reverse()}
            </p>
          </>
      </header>
    </div>
  );
}

export default App;
