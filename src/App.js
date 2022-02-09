import { Stack, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './App.css';
import AddBudgetModal from './Component/AddBudgetModal';
import AddExpenseModal from './Component/AddExpenseModal';
import ViewExpensesModal from './Component/ViewExpensesModal';
import BudgetCard from './Component/BudgetCard';
import { useState } from 'react';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './Contexts/BudgetContext';
import UncategorizedBudgetCard from './Component/UncategorizedBudgetCard';
import TotalBudgetCard from './Component/TotalBudgetCard';
function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <>
      <Container className='my-4'>
        <Stack direction='horizontal' gap='2' className='mb-4'>
          <h1 className='me-auto'>Budgets</h1>
          <Button
            variant='primary'
            onClick={() => {
              setShowAddBudgetModal(true);
            }}
          >
            Add Budget
          </Button>
          <Button variant='outline-primary' onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div className='grid-container'>
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpenseClick={() =>
                  setViewExpenseModalBudgetId(budget.id)
                }
                grey={true}
              />
            );
          })}

          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpenseClick={() =>
              setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => {
          setShowAddBudgetModal(false);
        }}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => {
          setShowAddExpenseModal(false);
        }}
      />
      <ViewExpensesModal
        budgetId={viewExpenseModalBudgetId}
        handleClose={() => {
          setViewExpenseModalBudgetId();
        }}
      />
    </>
  );
}

export default App;
