# Tracker app

## Goal

Create an app that's interactive, with visually appealing designs, which the user is encouraged to use **daily** to track their progress, ToDo's and thoughts that they encounter during the day. The main driver for this app being that the user has a way to connect with his/her past self and become a better and more organized individual.

## The Tracker's 10 commandments

- Tracker should be **fast and easy to use**. From the moment you log-in, to the very last feature available to the user.
- It should be **intuitive**, with descriptive names for each of the steps that the user should follow.
- It should run on a single page.
- It should rely on as few third-party services as possible.
- It should have separate files for the REST APIs. One for each of the [﻿features](https://app.eraser.io/workspace/HZxZRJdokoucDyLi4rXK#c5S1PnNx89eUFtVsdvYes).
- The app should never call the user **any** pronoun. Given the case, we always refer to the user as 'it'.
- Tracker should **force** the user to connect with a Google, Microsoft, Facebook (Meta), Apple or GitHub account. We explain why [﻿below](https://app.eraser.io/workspace/HZxZRJdokoucDyLi4rXK#sow_rM6EN1ho8JQGLtSJZ).
- The structure should be simple and modular, so that if any errors occurred, we could detect the root of the problem ASAP.
- It should have the fewest number of loading screens possible, and the changes should be reflected and seen immediately by the user after they have been done.

## Features

### ToDo list

Simple ToDo list, where you would write down an activity or chore that you want or have to do, select from the calendar the date and time the activity should be done, if it is recurring or not, and the app would remind you to do it.

Once you've done it, you checkmark it, and the app will ask you if the activity or chore will have to be done again in the future.

#### If that's the case, we ask the user if the activity is reoccurring:

- If it's not, we ask for the date and time.
- If it is, we ask what days of the week and at which time it should start and end.

#### Some directives for the ToDo feature

- We should allow the user to mark a start and an end for the activity.
- If the activity is reoccurring we should give the user the possibility to make it **different each day of the week**, or make certain weeks different from the rest, without the need to create a new ToDo.
- The user should have the option to mark changes in the ToDo hourly, daily, weekly, monthly or yearly.
  E.g.: If the user has a weekly reoccurring ToDo for **Monday at 13:00**, and they want to change the time of the ToDo from the next week to the end of the month, setting it for **Monday at 15:00**, they should be able to choose a period (could be indefinite, or define a specific one) where the ToDo changes the time it's reminded of.

> ToDos can be reoccurring but not recurring. This means that the ToDo can be set to happen again in the future, but not necessarily happen several times.

### Goal progress tracking

Similar to the ToDo

### Thought journal

> From time to time, small and non-intrusive pop-ups will appear on screen for the user to write down their thoughts, encouraging the usage of this feature.

This feature could serve as a way for the user to express what they're feeling and what they have in mind that day. In my personal experience, writing down thoughts serve as a way to look back at your past self and reflect on what were your feelings, a month, a year or even a decade from now.

It has to be simple and non-intrusive.

The app will remind the user, sometimes monthly, sometimes yearly or weekly, a thought or feeling they were having on the same day but a month or a year ago.

## Why force the user to use third-party authentication?

We know that security is big concern when it comes to using a new app from a developer we don't know anything about.

We also know that **authentication**, **encryption** and **storage** (as well as manipulation) of user data makes up for a huge part of the reputation that an app / organization has.

For that reason, we decided that we will **NOT** handle any authentication data, under any circumstance, and that the only personal details we would ask for are an email and a first name, so we would know who and where to send our emails to.

We also don't ask for a gender, because throughout the app, the user will never be referred to indirectly, erasing the necessity of using him/his/her/hers pronouns.

## Structure
