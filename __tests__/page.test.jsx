import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import Page from '@/app/(components)/IndexCSC'
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import Revenues from '@/app/(components)/cards/Revenues';
import { appStore } from '@/appStore';
import getTransactionsByYear from '@/actions/getTransactionsByYear';
import { REVENUES_VALUE } from '@/constants';
import { amountFromString } from '@/utils';
 
const initialState = {
  isLoading: false,
  filters: {
    account: '',
    industry: '',
    state: '',
    transaction_type: '',
    currency: 'brl',
    year: (new Date()).getFullYear()
  },
  notify: {
    open: false,
    message: '',
    severity: 'info',
  },
  transactions:[]
}

const HydrateAtoms = ({ initialValues, children }) => {
  useHydrateAtoms(initialValues)
  return children
}

const TestProvider = ({ initialValues, children }) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
)
const RevenuesProvider = () => {
  return (
    <TestProvider initialValues={[[appStore, initialState]]}>
      <Revenues />
    </TestProvider>
  )
}

describe('Home Page',  () => {

  it('Revenues card rendered on home page', async () => {
      render(<Page />);
      await waitFor(()=>{
        const revenuesCard = screen.getByTestId('revenues-card')
        expect(revenuesCard).toBeInTheDocument()
      })
  });
  
  it('Revenues card content', async ()=>{
    render(<RevenuesProvider/>);
    await waitFor(async ()=>{
      const year = (new Date()).getFullYear();
      
      const transactions = await getTransactionsByYear(2024);
      const revenues = transactions.filter(t=>t.transaction_type==REVENUES_VALUE);
      let reveneuesAmount = 0;
      revenues.reduce((p,c)=>p+amountFromString(c.amount),reveneuesAmount);

      const amount = screen.getByTestId('revenues-card-amount')
      expect(amount)
        .toBeInTheDocument()
      expect(amount).toHaveTextContent(`R$ ${reveneuesAmount}`)
    });
  })
})