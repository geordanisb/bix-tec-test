import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import Page from '@/app/(components)/IndexCSC'
import { Provider, useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import Revenues from '@/app/(components)/cards/Revenues';
import { appStore, getTransactions } from '@/appStore';
import getTransactionsByYear from '@/actions/getTransactionsByYear';
import { formatAmountFromNumber } from '@/utils';

const sumary = {
  "totalGrowth": {
    "months": [
      {
        "revenues": 0,
        "expenses": 0
      },
      {
        "revenues": 0,
        "expenses": 0
      },
      {
        "revenues": 0,
        "expenses": 0
      },
      {
        "revenues": 0,
        "expenses": 0
      },
      {
        "revenues": 17.57,
        "expenses": 58.04
      },
      {
        "revenues": 0,
        "expenses": 0
      },
      {
        "revenues": 0,
        "expenses": 0
      },
      {
        "revenues": 0,
        "expenses": 0
      },
      {
        "revenues": 0,
        "expenses": 0
      },
      {
        "revenues": 0,
        "expenses": 0
      },
      {
        "revenues": 0,
        "expenses": 0
      },
      {
        "revenues": 0,
        "expenses": 0
      }
    ],
    "total": 75.61
  },
  "revenues": {
    "amount": 17.57,
    "qty": 1,
    "pending": 0
  },
  "expenses": {
    "amount": 58.04,
    "qty": 2,
    "pending": 1
  },
  "companies": {
    "Penske Automotive Group": {
      "info": {
        "brl": {
          "revenuesQty": 0,
          "revenuesTotal": 0,
          "expensesQty": 1,
          "expensesTotal": 28.13
        }
      }
    },
    "General Mills": {
      "info": {
        "brl": {
          "revenuesQty": 1,
          "revenuesTotal": 17.57,
          "expensesQty": 0,
          "expensesTotal": 0
        }
      }
    },
    "American Airlines Group": {
      "info": {
        "brl": {
          "revenuesQty": 0,
          "revenuesTotal": 0,
          "expensesQty": 1,
          "expensesTotal": 29.91
        }
      }
    }
  },
  "pendingTransactions": [
    {
      "revenues": 0,
      "expenses": 0
    },
    {
      "revenues": 0,
      "expenses": 0
    },
    {
      "revenues": 0,
      "expenses": 0
    },
    {
      "revenues": 0,
      "expenses": 0
    },
    {
      "revenues": 0,
      "expenses": 0
    },
    {
      "revenues": 0,
      "expenses": 0
    },
    {
      "revenues": 0,
      "expenses": 1
    },
    {
      "revenues": 0,
      "expenses": 0
    },
    {
      "revenues": 0,
      "expenses": 0
    },
    {
      "revenues": 0,
      "expenses": 0
    },
    {
      "revenues": 0,
      "expenses": 0
    },
    {
      "revenues": 0,
      "expenses": 0
    }
  ],
  "states": {
    "MI": {
      "info": {
        "brl": {
          "revenuesQty": 0,
          "revenuesTotal": 0,
          "expensesQty": 1,
          "expensesTotal": 28.13
        }
      }
    },
    "MN": {
      "info": {
        "brl": {
          "revenuesQty": 1,
          "revenuesTotal": 17.57,
          "expensesQty": 0,
          "expensesTotal": 0
        }
      }
    },
    "TX": {
      "info": {
        "brl": {
          "revenuesQty": 0,
          "revenuesTotal": 0,
          "expensesQty": 1,
          "expensesTotal": 29.91
        }
      }
    }
  }
};

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
  transactions: { state: 'hasData', data: sumary }
}

const HydrateAtoms = ({ initialValues, children }) => {
  useHydrateAtoms(initialValues)
  return children
}

const TestProvider = ({ initialValues, children }) => {

  return <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
}

const RevenuesProvider = () => {

  return (
    <TestProvider initialValues={[[appStore, initialState]]}>
      <Revenues />
    </TestProvider>
  )
}

global.fetch = jest.fn(async () => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ sumary }),
  });
}
);


describe('Home Page', () => {

  it('Revenues card rendered on home page', async () => {
    render(<Page />);
    await waitFor(() => {
      const revenuesCard = screen.getByTestId('revenues-card')
      expect(revenuesCard).toBeInTheDocument()
    })
  });

  it('Revenues card content', async () => {
    render(<RevenuesProvider />);

    await waitFor(async () => {
      const year = (new Date()).getFullYear();

      const sumary = await getTransactionsByYear(year, { account: '', state: '' });
      const amount = sumary.revenues.amount;

      const amountSection = screen.getByTestId('revenues-card-amount');
      expect(amountSection)
        .toBeInTheDocument()
        console.log('amount ',formatAmountFromNumber(amount))
      expect(amountSection).toHaveTextContent(formatAmountFromNumber(amount))
    });
  })
})