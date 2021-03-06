import React from 'react';
import { Button, Card, ProgressBar, Stack } from 'react-bootstrap';
import { currencyFormatter } from '../util';
import './BudgetCard.css';

function getProgrossBarVarient(amount, max) {
  const ratio = amount / max;
  if (ratio < 0.5) {
    return 'primary';
  }
  if (ratio < 0.75) {
    return 'warning';
  }
  return 'danger';
}

export default function BudgetCard({
  name,
  amount,
  max,
  grey,
  hideButtons,
  onAddExpenseClick,
  onViewExpenseClick,
}) {
  const className = [];
  if (amount > max) {
    className.push('bg-danger', 'bg-opacity-10');
  } else if (grey) {
    className.push('bg-light');
  }
  return (
    <Card className={className.join(' ')}>
      <Card.Body>
        <Card.Title className='card-title'>
          <div className='me-2'>{name}</div>
          <div className='d-flex align-items-baseline'>
            {currencyFormatter.format(amount)}
            {max && (
              <span className='text-muted fs-6 ms-1'>
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className='rounded-pill'
            variant={getProgrossBarVarient(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction='horizontal' gap='2' className='mt-4'>
            <Button
              variant='outline-primary'
              className='ms-auto'
              onClick={onAddExpenseClick}
            >
              Add Expense
            </Button>
            <Button onClick={onViewExpenseClick} variant='outline-secondary'>
              View Expense
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}
