import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios';

import Page from '@/app/(components)/IndexCSC'
import { Provider } from 'jotai';

import { useHydrateAtoms } from 'jotai/utils';
import Revenues from '@/app/(components)/cards/Revenues';
import { appStore } from '@/appStore';
 
const transactionsResponse = {
  data:{
    transactions:[
    {
      "id": "cmdowpj410mht8onqpu3tqy8h",
      "date": 1747958400000,
      "amount": "2813",
      "transaction_type": "withdraw",
      "currency": "brl",
      "account": "Penske Automotive Group",
      "industry": "Automotive Retailing",
      "state": "MI",
      "pending": 0
    },
    {
      "id": "cmdowpj4b0n3o8onqlm5ng4r7",
      "date": 1747267200000,
      "amount": "1757",
      "transaction_type": "deposit",
      "currency": "brl",
      "account": "General Mills",
      "industry": "Food Consumer Products",
      "state": "MN",
      "pending": 0
    },
    {
      "id": "cmdowpja80z3k8onqqd20wjsc",
      "date": 1746414000000,
      "amount": "2991",
      "transaction_type": "withdraw",
      "currency": "brl",
      "account": "American Airlines Group",
      "industry": "Airlines",
      "state": "TX",
      "pending": 1
    },
    {
      "id": "cmdq48z910mhs8oyrqvpvjo98",
      "date": 1748044800000,
      "amount": "2813",
      "transaction_type": "withdraw",
      "currency": "brl",
      "account": "Penske Automotive Group",
      "industry": "Automotive Retailing",
      "state": "MI",
      "pending": 0
    }
  ]
  }
}
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

jest.mock('axios');

describe('Home Page',  () => {

  it('Revenues card rendered on home page', async () => {
      render(<Page />)
      await waitFor(()=>{
        const revenuesCard = screen.getByTestId('revenues-card')
        expect(revenuesCard).toBeInTheDocument()
      })
  })
  it('Revenues card content', async ()=>{
    axios.get.mockResolvedValueOnce(transactionsResponse);

    render(<RevenuesProvider/>)
    await waitFor(()=>{
        const amount = screen.getByTestId('revenues-card-amount')
        expect(amount)
          .toBeInTheDocument()
        expect(amount).toHaveTextContent('R$ 17,57')
    })
  })
})