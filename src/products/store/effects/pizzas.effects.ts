import { Injectable } from '@angular/core';

import * as pizzaActions from '../actions/pizzas.actions';
import * as fromServices from '../../services';

import { Effect, Actions }            from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of }                         from 'rxjs/observable/of';

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: fromServices.PizzasService) {}

  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS)
    .pipe(
      switchMap(() => {
        return this.pizzaService.getPizzas()
          .pipe(
            map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
            catchError(err => of(new pizzaActions.LoadPizzasFail(err)))
          )
      })
    );
}
