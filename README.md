# Raider Legacy

![header-banner](https://raw.githubusercontent.com/SugarF0x/raider/master/git/header-banner.jpg)

A passion-replica of _Dungeon Raid_ - an old and no longer updated smartphone game.

The source code is being distributed under **MIT license** - feel free to fork and modify any files.
Any pull requests are more than welcome, just please follow commit syntax stated at the bottom of this **README**.

## Specification

This project uses `Nuxt.js` as its main framework. `Konva.js` with its native `Vue` support manages canvas.
The application is responsive and will adjust to every screen type at a ratio of 9:16.
The application can be interacted with on PC as well as on any smartphone.

## Roadmap

This is my current roadmap of things to do that's **not** in any strict order.
Given my lack of experience if this field, every point here is subject to change.

- [X] Setup canvas
    - [X] Add responsive resize
- [ ] Setup dungeon field
    - [X] Add tiles render
    - [X] Add tile differentiation
    - [X] Add tiles' arrow selection
        - [X] Add backtracking
        - [ ] Add type check
            - [X] Let same types match
            - [ ] Let skulls match with swords
        - [X] Add proximity check
    - [ ] Add tiles' collection
        - [X] Delete tiles on collection
        - [X] Generate new tiles
            - [X] Generate tiles ontop the old ones
            - [X] Shift old ones down
        - [ ] Add functionality to tiles' collection
            - [ ] Handle coin collection
            - [ ] Handle potion collection
            - [ ] Handle sword collection
            - [ ] Handle skull collection
            - [ ] Handle shield collection
- [ ] Setup header field
- [ ] Setup footer field
- [ ] Setup skills field
- [ ] Setup menus field
- [ ] Setup status field
    - [ ] Setup coin display
    - [ ] Setup health display
    - [ ] Setup power display
        - [ ] Setup current weapon power display
        - [ ] Setup current armor display
        - [ ] Setup current enemy power display
    - [ ] Setup level progression display
    - [ ] Setup upgrade progression display

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Commit syntax 

Commit syntax is subjective. Committer is to pick most appropriate commit category themselves.

* :blue_book: Documentation - General documentation changes, in both .md and JsDoc
* :white_check_mark: Feature       - A new functional feature for end-user
* :hammer_and_wrench: Fix           - A bugfix of any kind
* :corn: Miscellaneous - Uncategorized changes
* :recycle: Refactor      - Under the hood code changes - nothing new for end-user
* :milky_way: Release       - End of dev cycle
* :art: Style         - Style changes, no new functionality
* :pill: Testing       - Completion and maintenance of test units
* :construction: WIP           - A stepping stone for a Work in Progress change

