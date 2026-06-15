## JavaScript Basics

### Q41. What are the different data types in JavaScript?

**Answer:**
JavaScript has eight data types — seven **primitive** types and one **object** type:

**Primitive types** (immutable, stored by value):
```javascript
// 1. Number - 64-bit floating point (IEEE 754)
let age = 25;
let price = 19.99;
let infinity = Infinity;
let notNumber = NaN; // typeof NaN === 'number' (!!)

// 2. String
let name = 'Alice';
let message = `Hello, ${name}!`; // Template literal

// 3. Boolean
let isActive = true;
let hasPermission = false;

// 4. undefined - variable declared but not assigned
let x;
console.log(x); // undefined
console.log(typeof undeclaredVar); // 'undefined' (no error)

// 5. null - intentional absence of value
let user = null; // typeof null === 'object' (historical bug!)

// 6. Symbol - unique identifier (ES6+)
const id1 = Symbol('id');
const id2 = Symbol('id');
console.log(id1 === id2); // false - always unique

// 7. BigInt - integers larger than Number.MAX_SAFE_INTEGER (ES2020)
const big = 9007199254740991n;
const larger = BigInt("9007199254740992");

// Object type (stores reference to memory location):
// 8. Object - includes plain objects, arrays, functions, dates, etc.
const obj = { name: 'Alice', age: 25 };
const arr = [1, 2, 3];
const fn = () => {};
const date = new Date();
console.log(typeof obj, typeof arr, typeof fn, typeof date);
// 'object'  'object'   'function' 'object'
```

**Type checking:**
```javascript
// typeof operator
typeof 42        // 'number'
typeof 'hello'   // 'string'
typeof true      // 'boolean'
typeof undefined // 'undefined'
typeof null      // 'object' (bug!)
typeof {}        // 'object'
typeof []        // 'object'
typeof function(){} // 'function'

// Better checks
Array.isArray([])           // true
value === null               // null check
Object.prototype.toString.call(value) // '[object Array]', '[object Date]', etc.
value instanceof Date        // true for Date objects
```

**Type coercion:**
```javascript
// Implicit coercion (surprising)
'5' + 3    // '53' (number coerced to string)
'5' - 3    // 2 (string coerced to number)
true + 1   // 2
null + 1   // 1
undefined + 1 // NaN
[] + {}    // '[object Object]'

// Explicit coercion (preferred)
Number('42')     // 42
String(42)       // '42'
Boolean(0)       // false
parseInt('42px') // 42
parseFloat('3.14abc') // 3.14
```

**Difficulty:** Beginner

**Real-World Scenario:**
A React form receives all input as strings, even numeric fields. A developer checking `if (quantity > 0)` with a string input like `"2"` accidentally gets `true` due to coercion. Using explicit `Number(quantity) > 0` or the Zod/Yup schema validation library prevents such bugs in a production checkout form.

**Follow-Up Questions:**
- What is the difference between `==` and `===` in JavaScript?
- Why does `typeof null` return `'object'` and how do you correctly check for null?
- What is the difference between `undefined` and `null` and when should each be used?

---

### Q42. What is the difference between `var`, `let`, and `const`?

**Answer:**
These are the three variable declaration keywords in JavaScript, with key differences in scope, hoisting, and mutability:

| Feature | `var` | `let` | `const` |
|---|---|---|---|
| Scope | Function | Block | Block |
| Hoisting | Hoisted & initialized to `undefined` | Hoisted, not initialized (TDZ) | Hoisted, not initialized (TDZ) |
| Re-declaration | ✅ Allowed | ❌ Not allowed | ❌ Not allowed |
| Re-assignment | ✅ Allowed | ✅ Allowed | ❌ Not allowed |
| Global property | ✅ `window.x` | ❌ | ❌ |

```javascript
// var: function-scoped, hoisted, leaks from blocks
function exampleVar() {
  if (true) {
    var x = 10; // Not block-scoped!
  }
  console.log(x); // 10 - accessible outside the if block
}

// Classic var loop bug
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // Prints: 3, 3, 3 (not 0, 1, 2!)
}

// let: block-scoped, temporal dead zone
function exampleLet() {
  if (true) {
    let y = 20;
  }
  // console.log(y); // ReferenceError: y is not defined
}

// let fixes the loop bug
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // Prints: 0, 1, 2 ✅
}

// const: block-scoped, cannot be reassigned (but objects ARE mutable)
const PI = 3.14159;
// PI = 3; // TypeError: Assignment to constant variable

// IMPORTANT: const doesn't make objects immutable!
const user = { name: 'Alice' };
user.name = 'Bob'; // ✅ This WORKS - mutating the object
user.age = 25;     // ✅ This WORKS too
// user = {};     // ❌ TypeError - can't reassign the binding

// Freeze for true immutability
const frozen = Object.freeze({ name: 'Alice' });
frozen.name = 'Bob'; // Silent failure in non-strict, error in strict
```

**Temporal Dead Zone (TDZ):**
```javascript
// var is accessible before declaration (as undefined)
console.log(a); // undefined (not ReferenceError)
var a = 5;

// let/const are in TDZ - not accessible before declaration
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 5;
```

**Best practices:**
- Use `const` by default.
- Use `let` when you need to reassign.
- Never use `var` in modern JavaScript.

**Difficulty:** Beginner

**Real-World Scenario:**
A React developer debugging a closure-based event handler noticed that all event handlers shared the same variable value (a classic `var` in a loop bug). Switching from `var` to `let` in the loop immediately fixed the issue, with each handler capturing its own distinct iteration variable.

**Follow-Up Questions:**
- What is the Temporal Dead Zone and why is it useful?
- How does the `const` keyword behave with arrays and objects?
- What is variable shadowing and what problems can it cause?

---

### Q43. What is hoisting in JavaScript?

**Answer:**
Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their scope before code execution. Understanding hoisting prevents confusing bugs.

**How hoisting works (conceptually):**
The JavaScript engine does two passes:
1. **Creation phase**: Scans scope, allocates memory for declarations.
2. **Execution phase**: Runs code top to bottom.

**Function declarations — fully hoisted:**
```javascript
// Can call before declaration
sayHello(); // 'Hello!' ✅

function sayHello() {
  console.log('Hello!');
}
```

**`var` — declaration hoisted, initialization is not:**
```javascript
console.log(x); // undefined (not ReferenceError)
var x = 5;
console.log(x); // 5

// What the engine "sees":
var x; // Hoisted to top
console.log(x); // undefined
x = 5;         // Assignment stays in place
console.log(x); // 5
```

**`let` and `const` — hoisted but in Temporal Dead Zone (TDZ):**
```javascript
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;

// The declaration IS hoisted (it's in memory), but accessing it
// before the line throws ReferenceError. This is the TDZ.
```

**Function expressions — not hoisted like declarations:**
```javascript
// TypeError: greet is not a function
greet();

var greet = function() { // greet is hoisted as undefined
  console.log('Hi');
};

// ReferenceError: Cannot access 'greet2' before initialization
greet2();

const greet2 = () => { // let/const: TDZ
  console.log('Hi');
};
```

**Class declarations — hoisted but in TDZ:**
```javascript
// ReferenceError
const user = new User();

class User {
  constructor() { this.name = 'default'; }
}
```

**Practical example — function declaration vs expression:**
```javascript
// These work because function declarations are fully hoisted:
const result1 = add(5, 3); // 8 ✅
function add(a, b) { return a + b; }

// This fails:
const result2 = multiply(5, 3); // TypeError ❌
const multiply = (a, b) => a * b;
```

**Difficulty:** Beginner

**Real-World Scenario:**
A junior developer on a React project placed utility function declarations at the bottom of a file and called them at the top, which worked fine (hoisting). However, when they converted them to arrow functions (const), the code broke with `TypeError: functionName is not a function`. Understanding hoisting explains this behavior and guides the decision to always use `const` arrow functions at the top of modules.

**Follow-Up Questions:**
- What is the difference between the hoisting of function declarations and function expressions?
- How does hoisting interact with closures?
- Does hoisting occur inside `if` blocks? What about function declarations inside blocks?

---

### Q44. What are JavaScript closures and how do they work?

**Answer:**
A closure is the combination of a function and the **lexical environment** in which that function was created. It gives a function access to variables from its outer (enclosing) scope even after the outer function has returned.

**Basic closure:**
```javascript
function outer() {
  let count = 0; // 'count' is in outer's scope

  function inner() {
    count++; // inner has access to outer's 'count'
    return count;
  }

  return inner; // Return the function (not calling it)
}

const counter = outer(); // outer() runs and returns 'inner'
// At this point, outer() has "returned", but its scope (count = 0) is preserved

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

const counter2 = outer(); // New closure, new scope
console.log(counter2()); // 1 (independent counter)
```

**Practical uses of closures:**

**1. Data privacy / module pattern:**
```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) throw new Error('Insufficient funds');
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance; // Can read but not directly modify
    }
  };
}

const account = createBankAccount(1000);
console.log(account.getBalance()); // 1000
account.deposit(500);
console.log(account.getBalance()); // 1500
// account.balance // undefined - cannot access directly!
```

**2. Function factories:**
```javascript
function createMultiplier(factor) {
  return (number) => number * factor; // Closes over 'factor'
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

**3. Memoization:**
```javascript
function memoize(fn) {
  const cache = new Map(); // Closed over

  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log('Cache hit!');
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveFn = memoize((n) => {
  // Expensive calculation
  return n * n;
});
```

**4. React Hooks use closures extensively:**
```javascript
// useState internally uses closures
function useState(initialValue) {
  let state = initialValue;
  
  const setState = (newValue) => {
    state = newValue;
    // trigger re-render
  };
  
  return [state, setState];
}

// Closure pitfall in useEffect
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // This closure captures the initial 'count' value (0)!
      setCount(count + 1); // Bug: always sets to 1
      
      // Fix: use functional update form
      setCount(prevCount => prevCount + 1); // ✅
    }, 1000);
    return () => clearInterval(timer);
  }, []); // Empty deps = count is always 0 in the closure
}
```

**Memory consideration:**
Closures keep the outer scope alive as long as the inner function exists. Large data structures in closed-over variables should be explicitly freed when no longer needed.

**Difficulty:** Intermediate

**Real-World Scenario:**
A React custom hook `useDebounce` uses closures to capture the latest callback function while maintaining a timer reference. The closure ensures that when the debounced function fires after the delay, it calls the most recent version of the callback (using a `useRef` to work around the stale closure problem in hooks).

**Follow-Up Questions:**
- What is a "stale closure" in React and how does `useRef` help solve it?
- How does the module pattern use closures to create private state?
- What is the relationship between closures and garbage collection in JavaScript?

---

### Q45. What is the JavaScript Event Loop?

**Answer:**
The Event Loop is the mechanism that enables JavaScript's non-blocking behavior despite being single-threaded. It continuously monitors the Call Stack and the Callback Queue, moving tasks to the stack when it's empty.

**Core components:**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           JavaScript Runtime                             │
│                                                                           │
│  ┌──────────────────┐     ┌──────────────────┐    ┌──────────────────┐  │
│  │   Call Stack     │     │   Web APIs       │    │  Callback Queues │  │
│  │                  │     │  (Browser/Node)  │    │                  │  │
│  │  [main()]        │────▶│  setTimeout      │───▶│  Macrotask Queue │  │
│  │  [fetch()]       │     │  fetch/XHR       │    │  [timer cb]      │  │
│  │                  │     │  DOM events      │    │  [IO cb]         │  │
│  └──────────────────┘     └──────────────────┘    ├──────────────────┤  │
│           ▲                                        │  Microtask Queue │  │
│           │                                        │  [Promise .then] │  │
│           └──────────────── Event Loop ────────────│  [queueMicrotask]│  │
│                             (poll queues)          └──────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

**Priority order:**
1. **Call Stack** — synchronous code executes first
2. **Microtask Queue** — Promise callbacks, `queueMicrotask()`, `MutationObserver`
3. **Macrotask Queue** — `setTimeout`, `setInterval`, `setImmediate` (Node.js), I/O callbacks

After each macrotask, ALL microtasks are drained before the next macrotask runs.

```javascript
console.log('1 - Start');          // Synchronous

setTimeout(() => {
  console.log('2 - setTimeout');   // Macrotask
}, 0);

Promise.resolve().then(() => {
  console.log('3 - Promise 1');    // Microtask
}).then(() => {
  console.log('4 - Promise 2');    // Microtask (chained)
});

queueMicrotask(() => {
  console.log('5 - queueMicrotask'); // Microtask
});

console.log('6 - End');             // Synchronous

// Output order:
// 1 - Start
// 6 - End
// 3 - Promise 1
// 4 - Promise 2
// 5 - queueMicrotask
// 2 - setTimeout
```

**Why `setTimeout(fn, 0)` doesn't run "immediately":**
```javascript
setTimeout(() => console.log('A'), 0);
// The callback goes to the macrotask queue
// It only runs AFTER the current call stack is empty AND
// all microtasks are processed

console.log('B');
Promise.resolve().then(() => console.log('C'));

// Output: B, C, A
// setTimeout's 0ms is a minimum delay, not a guarantee
```

**Node.js Event Loop phases:**
Node.js has additional phases: `timers` → `pending callbacks` → `idle/prepare` → `poll` → `check` (`setImmediate`) → `close callbacks`. Each phase has its own queue.

```javascript
// Node.js specific
setImmediate(() => console.log('setImmediate'));
setTimeout(() => console.log('setTimeout'), 0);
process.nextTick(() => console.log('nextTick')); // Runs before microtasks!

// Output: nextTick, setTimeout/setImmediate (order may vary), then setImmediate/setTimeout
```

**Difficulty:** Advanced

**Real-World Scenario:**
A Node.js Express server was experiencing slow response times under load. Investigation revealed that a CPU-intensive JSON parsing operation was being run synchronously during request handling, blocking the event loop for 200ms per request. Moving the work to a Worker Thread and handling the result via a Promise callback freed the event loop to process other requests concurrently, reducing P99 latency from 1200ms to 85ms.

**Follow-Up Questions:**
- What is the difference between microtasks and macrotasks, and why do microtasks have higher priority?
- How does `process.nextTick` differ from `Promise.resolve().then()` in Node.js?
- What does "blocking the event loop" mean and what are the consequences in a Node.js server?

---

### Q46. What are JavaScript Promises and how do they work?

**Answer:**
A Promise is an object representing the eventual completion or failure of an asynchronous operation. It provides a cleaner alternative to callback-based async code.

**Promise states:**
- **Pending**: Initial state, neither fulfilled nor rejected.
- **Fulfilled**: Operation completed successfully.
- **Rejected**: Operation failed.

Once settled (fulfilled or rejected), a promise's state cannot change.

```javascript
// Creating a Promise
const promise = new Promise((resolve, reject) => {
  // Async operation
  setTimeout(() => {
    const success = Math.random() > 0.5;
    if (success) {
      resolve({ data: 'Success!', status: 200 });
    } else {
      reject(new Error('Operation failed'));
    }
  }, 1000);
});

// Consuming a Promise
promise
  .then(result => {
    console.log('Fulfilled:', result);
    return result.data; // Return value for next .then()
  })
  .then(data => {
    console.log('Chained:', data);
  })
  .catch(error => {
    console.error('Rejected:', error.message);
  })
  .finally(() => {
    console.log('Always runs (like try/finally)');
  });
```

**Promise chaining:**
```javascript
function fetchUser(id) {
  return fetch(`/api/users/${id}`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    });
}

function fetchUserPosts(userId) {
  return fetch(`/api/users/${userId}/posts`).then(res => res.json());
}

// Chain async operations
fetchUser(1)
  .then(user => {
    console.log('User:', user.name);
    return fetchUserPosts(user.id); // Return next promise
  })
  .then(posts => {
    console.log('Posts:', posts.length);
  })
  .catch(err => console.error('Any error in the chain:', err));
```

**Promise static methods:**
```javascript
// Promise.all - all must resolve, fails fast on any rejection
const [user, posts, comments] = await Promise.all([
  fetchUser(1),
  fetchUserPosts(1),
  fetchComments(1)
]);

// Promise.allSettled - waits for ALL, returns array of results
const results = await Promise.allSettled([
  fetchUser(1),
  fetchUserPosts(1),
  fetchComments(1)
]);
results.forEach(result => {
  if (result.status === 'fulfilled') console.log(result.value);
  else console.error(result.reason);
});

// Promise.race - resolves/rejects with first settled promise
const first = await Promise.race([
  fetch('/api/server1/data'),
  fetch('/api/server2/data')
]);

// Promise.any - resolves with first fulfilled (ignores rejections)
// Rejects only if ALL reject (AggregateError)
const fastestSuccess = await Promise.any([
  fetch('/api/endpoint1'),
  fetch('/api/endpoint2')
]);
```

**Creating resolved/rejected promises:**
```javascript
// Immediately resolved
const resolved = Promise.resolve('value');
const rejected = Promise.reject(new Error('Failed'));

// Converting callback API to Promise
function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
```

**Difficulty:** Intermediate

**Real-World Scenario:**
A React dashboard fetches user data, their organization, and permissions simultaneously on mount. Using `Promise.all` reduces the total load time from sequential (3 × 200ms = 600ms) to parallel (~200ms for all three). Error handling in `.catch()` displays a user-friendly error message and triggers a retry mechanism.

**Follow-Up Questions:**
- What is the difference between `Promise.all` and `Promise.allSettled`?
- How do you handle errors in Promise chains vs async/await?
- What is Promise cancellation and how can it be implemented?

---

### Q47. What is `async/await` and how does it work under the hood?

**Answer:**
`async/await` is syntactic sugar over Promises, making asynchronous code look and behave like synchronous code. It was introduced in ES2017.

**Basic syntax:**
```javascript
// Before async/await (Promise chains)
function fetchUserData(userId) {
  return fetch(`/api/users/${userId}`)
    .then(res => res.json())
    .then(user => fetch(`/api/users/${user.id}/posts`))
    .then(res => res.json())
    .catch(err => console.error(err));
}

// With async/await (much more readable)
async function fetchUserData(userId) {
  try {
    const userRes = await fetch(`/api/users/${userId}`);
    if (!userRes.ok) throw new Error(`HTTP error: ${userRes.status}`);
    const user = await userRes.json();
    
    const postsRes = await fetch(`/api/users/${user.id}/posts`);
    const posts = await postsRes.json();
    
    return { user, posts };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error; // Re-throw for callers to handle
  }
}
```

**How it works under the hood:**
`async` functions always return a Promise. `await` pauses the function execution (not the thread!) until the Promise resolves, then resumes with the value.

```javascript
// This async function:
async function example() {
  const result = await somePromise();
  return result;
}

// Is roughly equivalent to:
function example() {
  return somePromise().then(result => result);
}
```

**Parallel vs sequential execution:**
```javascript
// ❌ Sequential - slower (waterfall)
async function sequential() {
  const user = await fetchUser(1);     // 200ms
  const posts = await fetchPosts(1);   // 200ms
  const comments = await fetchComments(1); // 200ms
  // Total: ~600ms
  return { user, posts, comments };
}

// ✅ Parallel - faster
async function parallel() {
  // Start all requests simultaneously
  const [user, posts, comments] = await Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchComments(1)
  ]);
  // Total: ~200ms (limited by slowest)
  return { user, posts, comments };
}

// Start together, await separately
async function parallel2() {
  const userPromise = fetchUser(1);     // Start immediately
  const postsPromise = fetchPosts(1);   // Start immediately
  
  const user = await userPromise;       // Wait for each
  const posts = await postsPromise;
  return { user, posts };
}
```

**Error handling patterns:**
```javascript
// try/catch (most common)
async function safeFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    return null; // Return null instead of throwing
  }
}

// Higher-order function for consistent error handling
const asyncHandler = (fn) => async (...args) => {
  try {
    return await fn(...args);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// In React - fetching in useEffect
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false; // Prevent state update on unmounted component
    
    async function loadUser() {
      try {
        const data = await fetchUser(userId);
        if (!cancelled) {
          setUser(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    
    loadUser();
    return () => { cancelled = true; };
  }, [userId]);
}
```

**Difficulty:** Intermediate

**Real-World Scenario:**
A React application was making sequential API calls in a useEffect hook: fetch user, then fetch organization, then fetch permissions. Converting to parallel `Promise.all` calls reduced the initial load time from 900ms to 300ms. The `cancelled` flag pattern prevents React's "can't perform state update on unmounted component" warning when users navigate away before the fetch completes.

**Follow-Up Questions:**
- How does `await` work inside a loop — what is the difference between `for...of` with await and `map` with await?
- What happens if you don't handle a rejected Promise in an async function?
- How would you implement a retry mechanism with `async/await`?

---

### Q48. What is the difference between `==` and `===` in JavaScript?

**Answer:**
These are JavaScript's equality operators:

**`===` (Strict equality):**
Compares **value AND type**. No type coercion.
```javascript
5 === 5      // true (same value, same type)
5 === '5'    // false (same value, different type)
null === null    // true
null === undefined // false
NaN === NaN  // false (NaN is never equal to anything, including itself!)
```

**`==` (Loose equality / Abstract equality):**
Compares **value after type coercion**. Often produces surprising results.
```javascript
5 == '5'         // true (string '5' coerced to number 5)
0 == false       // true (false coerced to 0)
0 == ''          // true (empty string coerced to 0)
null == undefined // true (special case)
null == 0        // false (null only equals null or undefined)
[] == false      // true ([] → '' → 0, false → 0)
[] == 0          // true
'' == false      // true
NaN == NaN       // false

// Truly bizarre:
'' == false      // true
'0' == false     // true
[] == false      // true
[0] == false     // true
```

**Coercion rules for `==`:**
1. If types are same, compare like `===`.
2. `null == undefined` → true.
3. Number `==` String → convert string to number.
4. Boolean `==` anything → convert boolean to number.
5. Object `==` primitive → convert object to primitive (toString/valueOf).

```javascript
// Use ===, not ==
// And use Object.is() for special cases:
Object.is(NaN, NaN)  // true (the only way to check for NaN equality)
Object.is(0, -0)     // false (distinguishes negative zero)
Object.is(null, null) // true
Object.is(null, undefined) // false
```

**Best practice:** Always use `===`. The only valid use of `==` is `x == null` (which checks for both `null` and `undefined`).

**Difficulty:** Beginner

**Real-World Scenario:**
A bug in a user role check (`if (user.role == 0)`) was accidentally passing for `user.role = ''` (empty string), granting access to unauthorized routes. Switching to `===` fixed the security vulnerability. This case demonstrates why loose equality should be avoided in security-critical comparisons.

**Follow-Up Questions:**
- What is the Abstract Equality Comparison Algorithm?
- When (if ever) is it acceptable to use `==` instead of `===`?
- What is `Object.is()` and when should it be used over `===`?

---

### Q49. What are JavaScript callbacks and what is "callback hell"?

**Answer:**
A **callback** is a function passed as an argument to another function, to be called when an operation completes. Callbacks were the primary way to handle async in pre-Promise JavaScript.

**Basic callback:**
```javascript
function fetchData(url, callback) {
  // Simulate async operation
  setTimeout(() => {
    const data = { user: 'Alice', id: 1 };
    callback(null, data); // Convention: error first, data second
  }, 1000);
}

fetchData('/api/user', (error, data) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Data:', data);
  }
});
```

**Callback hell** (the "pyramid of doom"):
Nested callbacks for sequential async operations become deeply indented and hard to read, maintain, and debug.

```javascript
// Callback hell - real example
getUser(userId, (err, user) => {
  if (err) return handleError(err);
  
  getOrganization(user.orgId, (err, org) => {
    if (err) return handleError(err);
    
    getPermissions(user.id, org.id, (err, permissions) => {
      if (err) return handleError(err);
      
      getAuditLog(user.id, (err, log) => {
        if (err) return handleError(err);
        
        // Finally do something with all the data
        renderDashboard({ user, org, permissions, log });
        // Now imagine error handling for each step...
      });
    });
  });
});
```

**Problems with callback hell:**
1. Deeply nested, hard to read ("pyramid of doom").
2. Error handling at every level is repetitive.
3. Difficult to add try/catch.
4. Control flow becomes complex.
5. Hard to handle parallel operations.

**Solutions:**
```javascript
// 1. Named functions (partial solution)
function handleUser(err, user) { ... }
function handleOrg(err, org) { ... }
getUser(userId, handleUser);

// 2. Promises (better)
getUser(userId)
  .then(user => getOrganization(user.orgId))
  .then(org => getPermissions(org.id))
  .catch(handleError);

// 3. Async/await (best readability)
async function loadDashboard(userId) {
  try {
    const user = await getUser(userId);
    const org = await getOrganization(user.orgId);
    const permissions = await getPermissions(user.id, org.id);
    renderDashboard({ user, org, permissions });
  } catch (err) {
    handleError(err);
  }
}
```

**Callbacks are still used for:**
- Event listeners: `button.addEventListener('click', callback)`
- Array methods: `[1,2,3].map(n => n * 2)`, `arr.filter(predicate)`
- Short synchronous operations
- Node.js stream events

**Difficulty:** Beginner

**Real-World Scenario:**
A legacy Express.js application had deeply nested MongoDB callback code for a complex report generation endpoint (4 levels deep). Migrating to async/await with Mongoose Promises reduced the endpoint code from 120 lines to 45 lines, eliminated 8 separate error handling blocks, and made the business logic clearly readable in sequence.

**Follow-Up Questions:**
- What is the Node.js `util.promisify()` function and how does it help migrate callback-based APIs?
- How do event emitters differ from callbacks, and when would you use each?
- What is "inversion of control" in the context of callbacks and why is it a design concern?

---

### Q50. What is the `this` keyword in JavaScript?

**Answer:**
`this` refers to the **execution context** — the object that a function is called on. Its value is determined at **call time**, not at definition time (with the exception of arrow functions).

**Rules for `this` (in order of precedence):**

**1. `new` binding — highest priority:**
```javascript
function Person(name) {
  this.name = name; // 'this' is the new object being created
}
const alice = new Person('Alice');
console.log(alice.name); // 'Alice'
```

**2. Explicit binding — `call`, `apply`, `bind`:**
```javascript
function greet() {
  return `Hello, I'm ${this.name}`;
}

const user = { name: 'Alice' };

// call: invoke immediately, args spread
greet.call(user);            // 'Hello, I\'m Alice'
greet.call(user, arg1, arg2);

// apply: invoke immediately, args array
greet.apply(user);           // 'Hello, I\'m Alice'
greet.apply(user, [arg1, arg2]);

// bind: returns NEW function with 'this' locked
const greetAlice = greet.bind(user);
greetAlice(); // 'Hello, I\'m Alice' - always uses user as this
```

**3. Implicit binding — method call:**
```javascript
const obj = {
  name: 'Alice',
  greet() {
    return `Hello, I'm ${this.name}`;
  }
};

obj.greet(); // 'Hello, I\'m Alice' - 'this' is obj
```

**4. Default binding — function call:**
```javascript
function greet() {
  console.log(this); // Window (browser) or global (Node.js) or undefined (strict mode)
}
greet(); // Default binding
```

**Arrow functions — lexical `this`:**
Arrow functions do NOT have their own `this`. They inherit `this` from the enclosing lexical scope.

```javascript
const obj = {
  name: 'Alice',
  
  // Regular function - 'this' depends on how it's called
  greetRegular: function() {
    setTimeout(function() {
      console.log(this.name); // undefined! (this = Window in timeout)
    }, 100);
  },
  
  // Arrow function - inherits 'this' from greetArrow's scope (obj)
  greetArrow: function() {
    setTimeout(() => {
      console.log(this.name); // 'Alice' ✅ (arrow inherits obj as this)
    }, 100);
  }
};

// The "this lost" problem with class methods
class Counter {
  constructor() {
    this.count = 0;
    // Fix 1: bind in constructor
    this.increment = this.increment.bind(this);
  }
  
  increment() {
    this.count++;
  }
}

// In React class components:
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    // Must bind, or 'this' is undefined in onClick handler
    this.handleClick = this.handleClick.bind(this);
  }
  
  // Or use class field (arrow function) syntax - cleaner:
  handleClick = () => {
    // Arrow: 'this' is always the component instance
    this.setState({ clicked: true });
  }
}
```

**Difficulty:** Intermediate

**Real-World Scenario:**
A React class component had an onClick handler that wasn't bound in the constructor, causing `this.setState is not a function` errors in production. Converting all class methods to arrow function class fields (`handleClick = () => {}`) resolved the binding issue and was adopted as a team standard. Modern React using hooks (`useState`, `useCallback`) avoids `this` entirely.

**Follow-Up Questions:**
- What is the difference between `call`, `apply`, and `bind`?
- How does `this` work inside a class in JavaScript?
- Why don't arrow functions have their own `this` and how does this make them useful for React event handlers?

---

### Q51. What is prototypal inheritance in JavaScript?

**Answer:**
JavaScript uses **prototypal inheritance** — objects can inherit properties and methods from other objects via the **prototype chain**.

**The prototype chain:**
```javascript
// Every object has a [[Prototype]] (accessible via __proto__ or Object.getPrototypeOf())
const animal = {
  eat() { return `${this.name} is eating`; }
};

const dog = {
  name: 'Rex',
  bark() { return 'Woof!'; },
  __proto__: animal // Set prototype (old syntax, use Object.create instead)
};

console.log(dog.bark()); // 'Woof!' - own property
console.log(dog.eat());  // 'Rex is eating' - inherited from animal
console.log(dog.toString()); // '[object Object]' - from Object.prototype

// Property lookup chain: dog → animal → Object.prototype → null
```

**`Object.create()` — cleaner prototype setting:**
```javascript
const animal = {
  eat() { return `${this.name} is eating`; },
  sleep() { return `${this.name} is sleeping`; }
};

const dog = Object.create(animal); // dog's prototype IS animal
dog.name = 'Rex';
dog.bark = function() { return 'Woof!'; };

// Check prototype
Object.getPrototypeOf(dog) === animal; // true
dog.hasOwnProperty('name'); // true
dog.hasOwnProperty('eat');  // false - inherited, not own
```

**Constructor functions and `prototype`:**
```javascript
function Animal(name) {
  this.name = name; // Own property
}

// Methods on prototype (shared by all instances - memory efficient!)
Animal.prototype.eat = function() {
  return `${this.name} is eating`;
};

Animal.prototype.type = 'Animal';

const rex = new Animal('Rex');
const spot = new Animal('Spot');

rex.eat === spot.eat; // true - same function reference, shared via prototype!
rex.name === spot.name; // false - each has own 'name'
```

**ES6 Classes — syntactic sugar over prototypal inheritance:**
```javascript
class Animal {
  constructor(name) {
    this.name = name; // own property
  }
  
  eat() { // Added to Animal.prototype
    return `${this.name} is eating`;
  }
  
  static createDefault() { // Static - not on prototype
    return new Animal('Generic');
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Calls Animal constructor
    this.breed = breed;
  }
  
  bark() { return 'Woof!'; }
  
  eat() { // Override
    return `${super.eat()} dog food`; // Call parent method
  }
}

const rex = new Dog('Rex', 'Labrador');
rex instanceof Dog;    // true
rex instanceof Animal; // true
```

**Prototype chain inspection:**
```javascript
rex.__proto__ === Dog.prototype       // true
Dog.prototype.__proto__ === Animal.prototype // true
Animal.prototype.__proto__ === Object.prototype // true
Object.prototype.__proto__ === null  // end of chain

// In ES6 classes, the chain is the same!
```

**Difficulty:** Intermediate

**Real-World Scenario:**
A React component library extends a base `BaseWidget` class that provides common methods like `getTheme()` and `trackAnalytics()`. Each widget (`BarChart`, `DataTable`, `KPICard`) extends `BaseWidget` via prototypal inheritance, sharing these utility methods without code duplication. Understanding the prototype chain helps debug why `instanceof` checks or `Object.getPrototypeOf()` return unexpected results in complex component hierarchies.

**Follow-Up Questions:**
- What is the difference between `__proto__`, `prototype`, and `Object.getPrototypeOf()`?
- How does `class` syntax differ from function constructor + prototype syntax?
- How do mixins work in JavaScript for multiple inheritance scenarios?

---

### Q52. What are the array methods `map`, `filter`, `reduce`, and `forEach`?

**Answer:**
These are the most commonly used array higher-order methods in JavaScript, fundamental to React development:

**`map(fn)`** — transforms each element, returns NEW array of same length:
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]
const strings = numbers.map(n => String(n)); // ['1', '2', '3', '4', '5']

// In React - rendering lists
const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
const elements = users.map(user => (
  <UserCard key={user.id} user={user} />
));
```

**`filter(fn)`** — keeps elements where predicate returns true, returns NEW array:
```javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(n => n % 2 === 0); // [2, 4, 6]
const odds = numbers.filter(n => n % 2 !== 0);  // [1, 3, 5]

// In React - filtering data
const activeUsers = users.filter(user => user.isActive);
const searchResults = products.filter(p => 
  p.name.toLowerCase().includes(searchTerm.toLowerCase())
);
```

**`reduce(fn, initialValue)`** — accumulates into single value:
```javascript
const numbers = [1, 2, 3, 4, 5];

// Sum
const sum = numbers.reduce((acc, curr) => acc + curr, 0); // 15

// Product
const product = numbers.reduce((acc, curr) => acc * curr, 1); // 120

// Build object from array
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];
const userMap = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {}); 
// { 1: { id: 1, name: 'Alice' }, 2: { id: 2, name: 'Bob' } }

// Group by
const orders = [
  { id: 1, status: 'pending' },
  { id: 2, status: 'shipped' },
  { id: 3, status: 'pending' }
];
const grouped = orders.reduce((acc, order) => {
  (acc[order.status] = acc[order.status] || []).push(order);
  return acc;
}, {});
// { pending: [{...}, {...}], shipped: [{...}] }

// Flatten
const nested = [[1,2], [3,4], [5,6]];
const flat = nested.reduce((acc, arr) => [...acc, ...arr], []);
// Same as: nested.flat()
```

**`forEach(fn)`** — executes function for side effects, returns `undefined`:
```javascript
// Use for side effects only - no return value!
users.forEach(user => {
  console.log(user.name);
  db.save(user); // Side effect
});

// ❌ Common mistake: forEach doesn't return anything
const result = [1,2,3].forEach(n => n * 2); // result = undefined!
// Use map instead when you need a new array
```

**Comparison:**
| Method | Returns | Mutates | Use for |
|---|---|---|---|
| `map` | New array (same length) | No | Transforming each element |
| `filter` | New array (shorter) | No | Selecting elements |
| `reduce` | Single value (any type) | No | Aggregation, converting arrays |
| `forEach` | `undefined` | No | Side effects |

**Other important array methods:**
```javascript
const arr = [1, 2, 3, 4, 5];

arr.find(n => n > 3);      // 4 (first match or undefined)
arr.findIndex(n => n > 3); // 3 (index or -1)
arr.some(n => n > 4);      // true (at least one matches)
arr.every(n => n > 0);     // true (all match)
arr.includes(3);           // true
arr.flat(depth);           // Flatten nested arrays
arr.flatMap(fn);           // map + flat(1)
arr.sort((a, b) => a - b); // Sort (mutates!)
arr.slice(1, 3);           // [2, 3] (doesn't mutate)
arr.splice(1, 2);          // Removes and returns; MUTATES
```

**Difficulty:** Beginner

**Real-World Scenario:**
A React e-commerce dashboard uses these methods extensively: `filter` to show only in-stock products, `map` to render product cards, and `reduce` to calculate cart totals and apply discount logic. The functional, non-mutating nature of these methods (except `sort`) aligns perfectly with React's immutable state updates.

**Follow-Up Questions:**
- How does `Array.prototype.flatMap` combine `map` and `flat`?
- What is the performance difference between `for...of` and `forEach`?
- How would you implement your own version of `reduce` from scratch?

---

## Advanced JavaScript

### Q81. What is the JavaScript Execution Context and how does it work?

**Answer:**
The Execution Context is the abstract concept of the environment in which JavaScript code is evaluated and executed. It defines what variables and functions are accessible at any point during execution.

**Types of Execution Contexts:**
1. **Global Execution Context (GEC)**: Created when the script starts. Creates the global object (`window` in browsers, `global` in Node.js) and `this` pointing to it.
2. **Function Execution Context (FEC)**: Created each time a function is called.
3. **Eval Execution Context**: Created inside `eval()` calls (avoid using eval).

**Each Execution Context has:**
1. **Variable Environment**: Where variables (`var`) and function declarations are stored.
2. **Lexical Environment**: Like Variable Environment but also stores `let`/`const` and has outer environment reference.
3. **`this` binding**: The value of `this` within this context.

**Two phases:**

**1. Creation Phase:**
```javascript
// Given this code:
function greet(name) {
  var greeting = 'Hello';
  let message = `${greeting}, ${name}!`;
  return message;
}
greet('Alice');

// During creation phase of greet's execution context:
// - 'greeting' is hoisted and set to undefined
// - 'name' is stored with value 'Alice'
// - 'message' is hoisted but in TDZ (let)
// - 'this' is determined
// - Outer environment reference is set (closure link)
```

**2. Execution Phase:**
```javascript
// Code runs line by line
// - greeting = 'Hello' (assignment)
// - message = 'Hello, Alice!' (TDZ ends, value assigned)
// - return message
```

**Call Stack — tracking execution contexts:**
```javascript
function third() {
  console.log('Third');  // 3rd pushed
}

function second() {
  third(); // 2nd pushed, then calls third
}

function first() {
  second(); // 1st pushed, then calls second
}

first();

// Call Stack at deepest point:
// [Global EC] → [first EC] → [second EC] → [third EC]
// 
// After each function returns, its EC is popped off the stack
```

**Scope Chain — the outer environment reference:**
```javascript
const globalVar = 'global';

function outer() {
  const outerVar = 'outer';
  
  function inner() {
    const innerVar = 'inner';
    console.log(globalVar); // Found in Global EC
    console.log(outerVar);  // Found in outer's EC (scope chain)
    console.log(innerVar);  // Found in inner's own EC
  }
  
  inner();
}

// inner's scope chain: inner EC → outer EC → Global EC → null
```

**Difficulty:** Advanced

**Real-World Scenario:**
A senior developer debugging a React custom hook's stale closure issue traced the problem through the execution context chain. The hook's callback was capturing variables from the function execution context at the time of the initial render, and subsequent re-renders created new execution contexts with updated variable values that the old callback couldn't see. Understanding execution contexts guided the fix: using `useRef` to maintain a mutable reference across execution contexts.

**Follow-Up Questions:**
- How does the lexical environment differ from the variable environment in an execution context?
- What causes a "Maximum call stack size exceeded" error and how do you fix it?
- How does JavaScript's execution context creation phase differ from the execution phase in terms of what happens with variables?

---

### Q82. What is a JavaScript Generator function?

**Answer:**
Generator functions (introduced in ES6) are special functions that can be paused and resumed, producing a sequence of values on demand. They use `function*` syntax and the `yield` keyword.

**Basic generator:**
```javascript
function* numberGenerator() {
  console.log('Start');
  yield 1;          // Pause and return 1
  console.log('Resumed');
  yield 2;          // Pause and return 2
  yield 3;
  console.log('End');
  return 'done';    // Final return value
}

const gen = numberGenerator(); // Creates iterator (doesn't run code yet)

console.log(gen.next()); // 'Start' → { value: 1, done: false }
console.log(gen.next()); // 'Resumed' → { value: 2, done: false }
console.log(gen.next()); // → { value: 3, done: false }
console.log(gen.next()); // 'End' → { value: 'done', done: true }
console.log(gen.next()); // → { value: undefined, done: true }
```

**Passing values to `yield`:**
```javascript
function* calculator() {
  const x = yield 'Enter X:';      // Receives value from next()
  const y = yield 'Enter Y:';
  return x + y;
}

const calc = calculator();
calc.next();         // { value: 'Enter X:', done: false }
calc.next(10);       // { value: 'Enter Y:', done: false } - x = 10
calc.next(20);       // { value: 30, done: true } - y = 20, returns 30
```

**Infinite sequences:**
```javascript
function* infiniteCounter(start = 0) {
  while (true) {
    yield start++;
  }
}

function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
// Never exhausts - perfectly fine, you control when to stop
```

**`yield*` — delegating to another generator:**
```javascript
function* gen1() {
  yield 1;
  yield 2;
}

function* gen2() {
  yield 0;
  yield* gen1();  // Delegates to gen1
  yield 3;
}

console.log([...gen2()]); // [0, 1, 2, 3]
```

**Practical uses:**
```javascript
// 1. Lazy evaluation / pagination
function* fetchPages(baseUrl) {
  let page = 1;
  while (true) {
    const data = yield fetch(`${baseUrl}?page=${page}`);
    if (!data || data.length === 0) return;
    page++;
  }
}

// 2. Custom iterables
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

for (const n of range(0, 10, 2)) {
  console.log(n); // 0, 2, 4, 6, 8
}

// 3. State machines
function* trafficLight() {
  while (true) {
    yield 'red';
    yield 'green';
    yield 'yellow';
  }
}

// 4. Redux-Saga uses generators for managing side effects
function* fetchUserSaga(action) {
  try {
    const user = yield call(fetchUser, action.id); // Pauses until promise resolves
    yield put(setUser(user));                       // Dispatches action
  } catch (err) {
    yield put(setError(err));
  }
}
```

**Difficulty:** Advanced

**Real-World Scenario:**
Redux-Saga, a popular middleware for managing React application side effects, is built entirely on generators. Each saga is a generator function that `yield`s effects (API calls, dispatching actions, waiting for actions). Generators allow sagas to be written as simple sequential code while handling complex async flows like cancellation, parallel tasks, and debouncing.

**Follow-Up Questions:**
- How do generators enable lazy evaluation and why is that useful for large datasets?
- What is the difference between a generator and an async generator (`async function*`)?
- How does Redux-Saga use generators to manage side effects?

---

### Q83. What is JavaScript's Proxy object?

**Answer:**
A `Proxy` object wraps another object (the target) and intercepts fundamental operations — property access, assignment, enumeration, function calls, etc. — through "traps."

```javascript
// Basic Proxy
const target = { name: 'Alice', age: 25 };

const handler = {
  // get trap - intercepts property access
  get(target, property, receiver) {
    console.log(`Getting ${property}`);
    return Reflect.get(target, property, receiver);
  },
  
  // set trap - intercepts property assignment
  set(target, property, value, receiver) {
    console.log(`Setting ${property} = ${value}`);
    if (property === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    return Reflect.set(target, property, value, receiver);
  },
  
  // has trap - intercepts 'in' operator
  has(target, property) {
    return property in target;
  },
  
  // deleteProperty trap
  deleteProperty(target, property) {
    if (property === 'name') throw new Error('Cannot delete name');
    return Reflect.deleteProperty(target, property);
  }
};

const proxy = new Proxy(target, handler);
proxy.name;     // Logs "Getting name", returns "Alice"
proxy.age = 30; // Logs "Setting age = 30"
proxy.age = 'old'; // Throws TypeError
```

**Practical uses:**

**1. Validation:**
```javascript
function createValidatedObject(schema) {
  return new Proxy({}, {
    set(target, prop, value) {
      if (schema[prop]) {
        const { type, required } = schema[prop];
        if (type && typeof value !== type) {
          throw new TypeError(`${prop} must be of type ${type}`);
        }
      }
      target[prop] = value;
      return true;
    }
  });
}

const user = createValidatedObject({
  name: { type: 'string', required: true },
  age: { type: 'number', required: false }
});
user.name = 'Alice'; // OK
user.age = '25';     // Throws: age must be of type number
```

**2. Reactive state (like Vue 3's reactivity):**
```javascript
function reactive(obj) {
  return new Proxy(obj, {
    set(target, prop, value) {
      const result = Reflect.set(target, prop, value);
      // Trigger re-render or notification
      notifySubscribers(prop, value);
      return result;
    }
  });
}

const state = reactive({ count: 0 });
state.count++; // Triggers notifySubscribers('count', 1)
```

**3. Default values:**
```javascript
const withDefaults = (target, defaults) => new Proxy(target, {
  get(target, prop) {
    return prop in target ? target[prop] : defaults[prop];
  }
});

const config = withDefaults(
  { timeout: 5000 },
  { timeout: 3000, retries: 3, baseUrl: '/api' }
);
config.retries; // 3 (from defaults)
config.timeout; // 5000 (from target)
```

**`Reflect`** — companion object to Proxy providing default behavior:
```javascript
// Reflect provides default implementations for all proxy traps
Reflect.get(target, prop, receiver);    // Default get
Reflect.set(target, prop, value, receiver); // Default set
Reflect.has(target, prop);             // Default 'in' behavior
Reflect.ownKeys(target);               // All own property names
```

**Difficulty:** Expert

**Real-World Scenario:**
Vue 3's reactivity system is built on `Proxy`. When you create a `reactive()` object, Vue wraps it in a Proxy with `get` traps for dependency tracking and `set` traps for triggering updates. This replaced Vue 2's `Object.defineProperty` approach (which couldn't detect new properties), enabling a more powerful and intuitive reactivity model.

**Follow-Up Questions:**
- What is the difference between Proxy and `Object.defineProperty`?
- How does Vue 3's reactivity system use Proxy differently than React's approach?
- What operations cannot be intercepted by Proxy?

---

### Q84. What are WeakMap and WeakSet in JavaScript?

**Answer:**
`WeakMap` and `WeakSet` are collections that hold **weak references** to their keys/values — allowing garbage collection when the referenced objects have no other references.

**WeakMap:**
- Keys must be **objects** (not primitives).
- Keys are **weakly referenced** — don't prevent garbage collection.
- Not iterable (no `forEach`, `size`, `keys()`, `values()`).
- Methods: `get`, `set`, `has`, `delete`.

```javascript
const weakMap = new WeakMap();

let user = { name: 'Alice' };
const metadata = { lastLogin: new Date(), sessionCount: 5 };

weakMap.set(user, metadata);
weakMap.get(user); // { lastLogin: ..., sessionCount: 5 }
weakMap.has(user); // true

// When 'user' is garbage collected, the WeakMap entry is automatically removed
user = null; // Now { name: 'Alice' } can be garbage collected
// The associated metadata is also garbage collected!
```

**WeakSet:**
- Stores only **objects**.
- Objects are weakly referenced.
- Not iterable.
- Methods: `add`, `has`, `delete`.

```javascript
const visitedNodes = new WeakSet();

function processNode(node) {
  if (visitedNodes.has(node)) return; // Cycle detection
  visitedNodes.add(node);
  // Process node...
  node.children?.forEach(processNode);
}
// When DOM nodes are removed, they're automatically cleared from visitedNodes
```

**Key use cases:**

**1. Private data for objects (before private class fields):**
```javascript
const _private = new WeakMap();

class User {
  constructor(name, password) {
    _private.set(this, { password }); // Truly private
    this.name = name;
  }
  
  checkPassword(input) {
    return _private.get(this).password === input;
  }
}

const user = new User('Alice', 'secret123');
user.password; // undefined - not accessible
user.checkPassword('secret123'); // true
```

**2. Caching without memory leaks:**
```javascript
const cache = new WeakMap();

function processElement(element) {
  if (cache.has(element)) return cache.get(element);
  
  const result = expensiveComputation(element);
  cache.set(element, result);
  return result;
}
// When DOM element is removed, cache entry is automatically cleaned up
```

**3. DOM node metadata:**
```javascript
const elementData = new WeakMap();

function attachData(element, data) {
  elementData.set(element, data);
}

// No memory leak when elements are removed from DOM
```

**vs Map and Set:**
| Feature | Map/Set | WeakMap/WeakSet |
|---|---|---|
| Key/value types | Any | Objects only |
| Iterable | ✅ | ❌ |
| `size` property | ✅ | ❌ |
| Prevents GC | ✅ | ❌ |
| Memory leaks | Possible | Not possible |

**Difficulty:** Advanced

**Real-World Scenario:**
A React component library uses WeakMap to associate computed style values with DOM nodes. When the component unmounts and the DOM node is removed, the WeakMap automatically frees the cached style data without requiring any explicit cleanup code. A regular Map would hold references to removed DOM nodes indefinitely, causing memory leaks in long-running applications.

**Follow-Up Questions:**
- Why can't you iterate over a WeakMap's entries?
- How does WeakMap prevent memory leaks in the context of caching?
- How do ES2022 private class fields (`#field`) replace the WeakMap privacy pattern?

---

### Q85. What is debouncing and throttling in JavaScript?

**Answer:**
Both are rate-limiting techniques to control how often a function runs, critical for performance optimization in UI applications.

**Debouncing:**
Delays function execution until after a specified time has passed since the last call. Used for search inputs, form validation, resize handlers.

```javascript
function debounce(fn, delay) {
  let timeoutId;
  
  return function(...args) {
    // Clear any existing timer
    clearTimeout(timeoutId);
    
    // Set a new timer
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// Usage: search input
const handleSearch = debounce(async (query) => {
  const results = await fetchSearchResults(query);
  setResults(results);
}, 300);

// React hook version
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer); // Cleanup on next render
  }, [value, delay]);
  
  return debouncedValue;
}

// In component:
function SearchBox() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  
  useEffect(() => {
    if (debouncedQuery) fetchResults(debouncedQuery);
  }, [debouncedQuery]);
  
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
```

**Throttling:**
Ensures function runs at most once per specified interval. Used for scroll handlers, mousemove, window resize, button click spam prevention.

```javascript
function throttle(fn, interval) {
  let lastCallTime = 0;
  
  return function(...args) {
    const now = Date.now();
    
    if (now - lastCallTime >= interval) {
      lastCallTime = now;
      return fn.apply(this, args);
    }
  };
}

// Usage: scroll position tracking
const handleScroll = throttle(() => {
  const scrollY = window.scrollY;
  updateNavbarStyle(scrollY);
}, 100); // At most 10 times per second

window.addEventListener('scroll', handleScroll);

// React hook version
function useThrottle(fn, interval) {
  const lastCallRef = useRef(0);
  
  return useCallback((...args) => {
    const now = Date.now();
    if (now - lastCallRef.current >= interval) {
      lastCallRef.current = now;
      fn(...args);
    }
  }, [fn, interval]);
}
```

**Key difference:**
- **Debounce**: "Wait until you've stopped calling me for X ms, then call once."
- **Throttle**: "Call me at most once every X ms, no matter how many times you call."

```
User types: a b c d e f g (keys pressed rapidly)

Debounce (300ms):
User: a b c d e f g _ _ _ (300ms silence)
Fn:                       ↑ Called once with 'g'

Throttle (300ms):
User: a b c d e f g h i j k l
Fn:   ↑       ↑       ↑       (every 300ms regardless)
```

**Leading vs Trailing edge:**
```javascript
// Advanced debounce with leading/trailing options
function debounce(fn, delay, { leading = false, trailing = true } = {}) {
  let timeoutId;
  
  return function(...args) {
    const callNow = leading && !timeoutId;
    
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (trailing && !callNow) fn.apply(this, args);
    }, delay);
    
    if (callNow) fn.apply(this, args);
  };
}
```

**Difficulty:** Intermediate

**Real-World Scenario:**
A React search interface reduces server load from 300 API calls/minute to 15 calls/minute by debouncing the search input with a 300ms delay. A separate infinite scroll handler uses throttle to trigger "load more" logic at most every 200ms during rapid scrolling, preventing duplicate data fetches when the scroll event fires rapidly.

**Follow-Up Questions:**
- When would you use leading-edge debounce vs trailing-edge?
- How does Lodash's `_.debounce` improve upon a basic debounce implementation?
- How do you clean up debounced/throttled functions in React's `useEffect`?

---

### Q86. What is currying in JavaScript?

**Answer:**
Currying transforms a function that takes multiple arguments into a sequence of functions, each taking a single argument. Named after mathematician Haskell Curry.

```javascript
// Non-curried
function add(a, b, c) {
  return a + b + c;
}
add(1, 2, 3); // 6

// Manually curried
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

// Arrow function version:
const curriedAdd = a => b => c => a + b + c;

curriedAdd(1)(2)(3); // 6

// Partial application
const add1 = curriedAdd(1);    // b => c => 1 + b + c
const add1and2 = add1(2);      // c => 1 + 2 + c
add1and2(3);                   // 6
```

**Generic curry function:**
```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...args2) {
      return curried.apply(this, args.concat(args2));
    };
  };
}

const add = curry((a, b, c) => a + b + c);
add(1)(2)(3); // 6
add(1, 2)(3); // 6
add(1)(2, 3); // 6
add(1, 2, 3); // 6 - all at once still works
```

**Practical uses:**

**1. Reusable utility functions:**
```javascript
const multiply = a => b => a * b;
const double = multiply(2);  // Partially applied
const triple = multiply(3);
const tenTimes = multiply(10);

[1, 2, 3, 4].map(double);  // [2, 4, 6, 8]
[1, 2, 3, 4].map(triple);  // [3, 6, 9, 12]
```

**2. Function composition:**
```javascript
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const addTax = rate => price => price * (1 + rate);
const format = currency => amount => `${currency}${amount.toFixed(2)}`;
const discount = pct => price => price * (1 - pct);

const processPrice = pipe(
  discount(0.1),    // 10% off
  addTax(0.08),     // 8% tax
  format('$')       // Format as dollars
);

processPrice(100); // '$97.20'
```

**3. Event handlers in React:**
```javascript
// Without currying - need anonymous function per item
{items.map(item => (
  <button onClick={() => handleDelete(item.id)}>Delete</button>
))}

// With currying - cleaner
const handleDelete = id => () => {
  dispatch(deleteItem(id));
};

{items.map(item => (
  <button onClick={handleDelete(item.id)}>Delete</button>
))}
```

**4. API request builders:**
```javascript
const request = method => url => data => 
  fetch(url, { method, body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });

const get  = request('GET');
const post = request('POST');
const put  = request('PUT');

const createUser = post('/api/users');
const getUser    = get('/api/users/1');

await createUser({ name: 'Alice' });
```

**Difficulty:** Advanced

**Real-World Scenario:**
A React form validation library uses currying to create reusable validators. `validate('required')('email')(maxLength(100))` builds a validation pipeline. Each validator is a curried function that takes the rule, then the value, returning an error message or null. This pattern enables composable, readable validation chains.

**Follow-Up Questions:**
- What is the difference between currying and partial application?
- How does function composition use currying?
- What are the performance implications of currying in hot code paths?

---

### Q87. What are JavaScript Symbols and when should you use them?

**Answer:**
Symbols (ES6) are a primitive type creating **unique, immutable identifiers**. Every `Symbol()` call creates a globally unique value.

```javascript
// Each Symbol is unique
const id1 = Symbol('id');
const id2 = Symbol('id');
console.log(id1 === id2); // false - always unique!
console.log(id1.toString()); // 'Symbol(id)'
console.log(id1.description); // 'id'

// Symbols as object keys (non-string keys)
const USER_ID = Symbol('userId');
const user = {
  name: 'Alice',
  [USER_ID]: 12345  // Symbol as computed property
};

user.name;   // 'Alice' - normal access
user[USER_ID]; // 12345 - symbol access
```

**Symbols are non-enumerable (semi-private):**
```javascript
const SECRET = Symbol('secret');
const obj = {
  name: 'Alice',
  [SECRET]: 'shh'
};

Object.keys(obj);        // ['name'] - no symbols
JSON.stringify(obj);     // '{"name":"Alice"}' - symbols excluded
for...in: 'name' only

// But can still access if you have the symbol reference:
obj[SECRET]; // 'shh'

// To get object's own symbols:
Object.getOwnPropertySymbols(obj); // [Symbol(secret)]
Reflect.ownKeys(obj); // ['name', Symbol(secret)]
```

**Symbol.for() — global symbol registry:**
```javascript
// Share symbols across modules via global registry
const s1 = Symbol.for('myApp.userId');
const s2 = Symbol.for('myApp.userId');
console.log(s1 === s2); // true (same entry in registry)

Symbol.keyFor(s1); // 'myApp.userId'
```

**Well-known Symbols — customize language behavior:**
```javascript
// Symbol.iterator - make custom objects iterable
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        return current <= end 
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      }
    };
  }
}

const range = new Range(1, 5);
console.log([...range]); // [1, 2, 3, 4, 5]
for (const n of range) console.log(n); // 1, 2, 3, 4, 5

// Symbol.toPrimitive - control type coercion
class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }
  
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return this.amount;
    if (hint === 'string') return `${this.currency}${this.amount}`;
    return this.amount; // default
  }
}

const price = new Money(29.99, '$');
+price;         // 29.99 (number hint)
`${price}`;     // '$29.99' (string hint)
price + 0;      // 29.99 (default hint)

// Other well-known symbols:
// Symbol.hasInstance  - instanceof behavior
// Symbol.species      - species for derived objects
// Symbol.asyncIterator - async iteration
// Symbol.toStringTag  - Object.prototype.toString behavior
```

**Difficulty:** Advanced

**Real-World Scenario:**
A JavaScript SDK for a payment platform uses Symbols for internal-only API keys on exported objects. Third-party code using the SDK cannot accidentally access or overwrite internal state (like authentication tokens or configuration) because the keys are Symbols that don't show up in `Object.keys()`, JSON serialization, or `for...in` loops. `Symbol.for()` allows different modules within the SDK to share the same internal symbols.

**Follow-Up Questions:**
- How can Symbols be used to implement private class members before the `#` syntax?
- What are the implications of Symbols not being included in `JSON.stringify()`?
- What is `Symbol.iterator` and how do you use it to make a custom class iterable?

---

### Q88. What is JavaScript's Reflect API?

**Answer:**
The `Reflect` object (ES6) provides methods for interceptable JavaScript operations — it's a companion to `Proxy`, providing default behavior for proxy traps, and a cleaner API for certain meta-programming operations.

```javascript
// Reflect methods mirror Proxy trap names

// Reflect.get(target, prop, receiver)
const obj = { name: 'Alice' };
Reflect.get(obj, 'name'); // 'Alice' (same as obj['name'])

// Reflect.set(target, prop, value, receiver)
Reflect.set(obj, 'age', 25); // true (same as obj.age = 25, returns boolean)

// Reflect.has(target, prop)
Reflect.has(obj, 'name'); // true (same as 'name' in obj)

// Reflect.deleteProperty(target, prop)
Reflect.deleteProperty(obj, 'age'); // true (same as delete obj.age)

// Reflect.ownKeys(target)
Reflect.ownKeys(obj); // ['name'] (includes symbols, unlike Object.keys)

// Reflect.defineProperty(target, prop, descriptor)
Reflect.defineProperty(obj, 'id', { value: 1, enumerable: true });

// Reflect.getOwnPropertyDescriptor(target, prop)
Reflect.getOwnPropertyDescriptor(obj, 'name');
// { value: 'Alice', writable: true, enumerable: true, configurable: true }

// Reflect.apply(fn, thisArg, args)
function greet(greeting) { return `${greeting}, ${this.name}`; }
Reflect.apply(greet, { name: 'Alice' }, ['Hello']); // 'Hello, Alice'
// Better than: greet.apply({name:'Alice'}, ['Hello'])

// Reflect.construct(target, args, newTarget)
function Animal(name) { this.name = name; }
const a = Reflect.construct(Animal, ['Rex']); // Same as new Animal('Rex')
```

**Why use Reflect in Proxy handlers:**
```javascript
// ❌ Without Reflect (problems with this binding, setter returns)
const proxy = new Proxy(obj, {
  get(target, prop) {
    return target[prop]; // May lose 'this' binding for getters
  },
  set(target, prop, value) {
    target[prop] = value;
    return true; // Must manually return true
  }
});

// ✅ With Reflect (correct behavior automatically)
const proxy = new Proxy(obj, {
  get(target, prop, receiver) {
    console.log(`Accessing ${prop}`);
    return Reflect.get(target, prop, receiver); // Correct 'this' binding
  },
  set(target, prop, value, receiver) {
    console.log(`Setting ${prop}`);
    return Reflect.set(target, prop, value, receiver); // Returns boolean automatically
  }
});
```

**Checking if an operation succeeded:**
```javascript
// Old way (Object.defineProperty throws on failure)
try {
  Object.defineProperty(frozenObj, 'name', { value: 'Bob' });
} catch (e) {
  console.error('Failed');
}

// New way (Reflect returns boolean)
const success = Reflect.defineProperty(frozenObj, 'name', { value: 'Bob' });
if (!success) console.error('Failed'); // No try/catch needed
```

**Difficulty:** Expert

**Real-World Scenario:**
A JavaScript ORM library uses `Proxy` and `Reflect` to create "virtual" model instances that lazily load data from the database. `Reflect.get` in the handler forwards property access to the underlying data object, while intercepting specific property names to trigger lazy loading from MongoDB via Mongoose. `Reflect` ensures that inherited getters and prototype methods work correctly even through the proxy layer.

**Follow-Up Questions:**
- Why is `Reflect.get(target, prop, receiver)` important for prototype chain and getter correctness in Proxy?
- What does the `receiver` parameter represent in Reflect methods?
- How would you use Reflect to implement a deep observable state object?

---

### Q89. What is memoization and how do you implement it in JavaScript?

**Answer:**
Memoization is an optimization technique that caches the results of expensive function calls and returns the cached result when the same inputs are seen again.

**Basic memoization:**
```javascript
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Expensive calculation
const fibonacci = memoize(function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
});

console.time('first');
fibonacci(40); // Calculates
console.timeEnd('first'); // ~0.3ms

console.time('second');
fibonacci(40); // From cache
console.timeEnd('second'); // ~0.01ms
```

**Recursive memoization:**
```javascript
// Self-referencing memoized fibonacci
function memoize(fn) {
  const cache = new Map();
  return function memoized(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Must be defined this way for recursion to use memoized version
const fib = memoize(n => {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2); // Calls memoized version
});
```

**React's memoization tools:**
```javascript
// useMemo - memoize computed values
function ProductList({ products, category }) {
  // Only recalculates when products or category changes
  const filteredProducts = useMemo(() => {
    return products.filter(p => p.category === category);
  }, [products, category]);
  
  return filteredProducts.map(p => <ProductCard key={p.id} product={p} />);
}

// useCallback - memoize functions
function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // Without useCallback: new function reference every render
  // ChildComponent would re-render unnecessarily
  const handleClick = useCallback(() => {
    console.log('clicked');
    setCount(c => c + 1);
  }, []); // Empty deps - never changes
  
  return <ChildComponent onClick={handleClick} />;
}

// React.memo - memoize entire components
const ProductCard = React.memo(function ProductCard({ product }) {
  return <div>{product.name}</div>;
});
// Only re-renders when 'product' prop changes (shallow comparison)
```

**Memoization with TTL (Time To Live):**
```javascript
function memoizeWithTTL(fn, ttl = 60000) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    const cached = cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.value;
    }
    
    const result = fn.apply(this, args);
    cache.set(key, { value: result, timestamp: Date.now() });
    return result;
  };
}
```

**Difficulty:** Intermediate

**Real-World Scenario:**
A React analytics dashboard renders a complex chart requiring sorting and aggregating thousands of data points. Without `useMemo`, the aggregation runs on every re-render (even when sorting by different columns). Wrapping in `useMemo` with `[rawData]` as dependency ensures the expensive calculation only runs when the underlying data changes, reducing dashboard render time from 400ms to 15ms.

**Follow-Up Questions:**
- What are the trade-offs of memoization (when should you NOT memoize)?
- How does React's `useCallback` differ from `useMemo` and when should you use each?
- What problems can arise when using `JSON.stringify` as a memoization key?

---

### Q90. What is the Module Pattern in JavaScript and how do ES Modules work?

**Answer:**
The Module Pattern uses closures to create private state and expose a public API. ES Modules provide a native, standardized module system.

**Module Pattern (pre-ES6):**
```javascript
const userModule = (function() {
  // Private
  let users = [];
  let nextId = 1;
  
  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  
  // Public API
  return {
    addUser(name, email) {
      if (!validateEmail(email)) throw new Error('Invalid email');
      const user = { id: nextId++, name, email };
      users.push(user);
      return user;
    },
    getUsers() {
      return [...users]; // Return copy to prevent mutation
    },
    getUserById(id) {
      return users.find(u => u.id === id);
    }
  };
})(); // IIFE - Immediately Invoked Function Expression

userModule.addUser('Alice', 'alice@example.com');
userModule.getUsers(); // [{id: 1, name: 'Alice', ...}]
userModule.users; // undefined - private!
```

**ES Modules (ESM) — native module system:**
```javascript
// math.js - Exporting
export const PI = 3.14159;

export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }

// Default export
export default function square(x) { return x * x; }

// Re-export
export { add as sum } from './otherModule.js';
```

```javascript
// app.js - Importing
import square from './math.js';          // Default import
import { add, PI } from './math.js';    // Named imports
import { multiply as mult } from './math.js'; // Rename
import * as Math from './math.js';      // Namespace import

// Dynamic import (lazy loading)
async function loadMath() {
  const { add } = await import('./math.js');
  return add(2, 3);
}

// In React with lazy loading:
const HeavyChart = lazy(() => import('./HeavyChart.jsx'));
```

**CommonJS (Node.js):**
```javascript
// math.js (CommonJS)
const PI = 3.14159;
function add(a, b) { return a + b; }

module.exports = { PI, add };
// Or: module.exports.PI = PI;

// app.js
const { PI, add } = require('./math.js');
const mathModule = require('./math.js'); // Entire module
```

**Key differences:**

| Feature | CommonJS | ES Modules |
|---|---|---|
| Syntax | `require()`/`module.exports` | `import`/`export` |
| Loading | Synchronous | Asynchronous |
| Evaluation | At runtime | Static (analyzed at build time) |
| Tree shaking | ❌ Difficult | ✅ Easy (static structure) |
| Top-level await | ❌ | ✅ (ES2022) |
| `this` at top level | `exports` object | `undefined` |
| File extension | `.js` or `.cjs` | `.mjs` or `.js` (with `"type":"module"`) |

**Top-level await in ESM:**
```javascript
// In ES Modules (Node.js 14.8+, modern browsers)
const config = await fetch('/config.json').then(r => r.json());
export { config }; // Other modules get the resolved value
```

**Difficulty:** Intermediate

**Real-World Scenario:**
A large React application migrated from a CommonJS module structure to ES Modules to enable tree shaking. A utility library with 50 functions was being imported in full (adding ~40 KB to bundle) even when only 2 functions were needed. With ESM, Webpack/Vite's tree shaking automatically eliminated unused exports, reducing the bundle size by 35 KB.

**Follow-Up Questions:**
- What is tree shaking and why do ES Modules enable it while CommonJS does not?
- How does dynamic `import()` enable code splitting in React applications?
- What is the difference between `default` and named exports and when should you use each?

---

## ES6+ Features

### Q121. What are the key ES6+ features every MERN developer should know?

**Answer:**
ES6 (2015) and subsequent ECMAScript versions introduced foundational features used constantly in MERN development:

**1. Arrow Functions:**
```javascript
// ES5
function add(a, b) { return a + b; }
var double = function(n) { return n * 2; };

// ES6+
const add = (a, b) => a + b;
const double = n => n * 2;
const getUser = async (id) => {
  const user = await fetchUser(id);
  return user;
};
```

**2. Template Literals:**
```javascript
const name = 'Alice';
const age = 25;

// Old
'Hello, ' + name + '! You are ' + age + ' years old.'

// Template literal
`Hello, ${name}! You are ${age} years old.`
`${age > 18 ? 'Adult' : 'Minor'}`

// Tagged templates
const html = String.raw`<div class="${cls}">${content}</div>`;
// css`` is used by styled-components for CSS-in-JS
```

**3. Destructuring:**
```javascript
// Object destructuring
const { name, age, address: { city } = {} } = user;
const { name: userName = 'Anonymous' } = user; // Rename + default

// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
const [, , third] = [1, 2, 3]; // Skip elements

// In function parameters
function UserCard({ name, email, role = 'user' }) { ... }

// useState uses array destructuring
const [count, setCount] = useState(0);
```

**4. Spread and Rest operators:**
```javascript
// Spread: expand iterables
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

const user = { name: 'Alice' };
const updatedUser = { ...user, age: 25 }; // { name: 'Alice', age: 25 }

// React state updates
setState(prev => ({ ...prev, loading: false }));

// Rest: collect remaining arguments
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
```

**5. Default Parameters:**
```javascript
function createUser(name, role = 'user', active = true) {
  return { name, role, active };
}
```

**6. Enhanced Object Literals:**
```javascript
const name = 'Alice';
const age = 25;

// Old
const user = { name: name, age: age };

// Shorthand properties + computed keys + method shorthand
const user = {
  name,                         // Shorthand property
  age,
  ['user_' + name]: true,      // Computed key
  greet() { return `Hi, I'm ${this.name}`; } // Method shorthand
};
```

**7. Classes:**
```javascript
class Animal {
  #name; // Private field (ES2022)
  
  constructor(name) {
    this.#name = name;
  }
  
  get name() { return this.#name; }
  
  speak() { return `${this.#name} makes a sound`; }
  
  static create(name) { return new Animal(name); }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  speak() { return `${super.speak()} - Woof!`; }
}
```

**8. Optional Chaining (`?.`) and Nullish Coalescing (`??`):**
```javascript
// Optional chaining - safe property access
const city = user?.address?.city;              // undefined if any is null/undefined
const firstTag = article?.tags?.[0];           // Array element
const result = obj?.method?.();                // Method call

// Nullish coalescing - default only for null/undefined
const name = user.name ?? 'Anonymous';         // 'Anonymous' only if null/undefined
const count = data.count ?? 0;                 // Not triggered by 0 or '' (unlike ||)

// Logical assignment operators (ES2021)
a ??= 'default'; // a = a ?? 'default'
a ||= 'default'; // a = a || 'default'
a &&= transform(a); // a = a && transform(a)
```

**9. `for...of` loop:**
```javascript
for (const item of array) { ... }
for (const [key, value] of map) { ... }
for (const char of 'hello') { ... }
```

**10. `Promise.allSettled`, `Promise.any`, `at()` (ES2021+):**
```javascript
const results = await Promise.allSettled([p1, p2, p3]);

const arr = [1, 2, 3, 4, 5];
arr.at(-1);  // 5 - last element
arr.at(-2);  // 4

// Object.entries, Object.fromEntries
const entries = Object.entries({ a: 1, b: 2 }); // [['a', 1], ['b', 2]]
const obj = Object.fromEntries(entries); // { a: 1, b: 2 }

// Array.from
const divs = Array.from(document.querySelectorAll('div'));
const range = Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]
```

**Difficulty:** Beginner

**Real-World Scenario:**
A React component receiving deeply nested API data uses optional chaining to safely access nested values without throwing errors: `user?.profile?.preferences?.theme ?? 'light'`. This replaced chains of `&&` checks (5 lines → 1 line) and handles the case where the API might omit nested fields gracefully.

**Follow-Up Questions:**
- What is the difference between the nullish coalescing operator (`??`) and logical OR (`||`)?
- How does optional chaining (`?.`) interact with nullish coalescing in practice?
- What are the ES2022 and ES2023 features that are most relevant for MERN development?

---

### Q122. What are JavaScript Iterators and the Iterable Protocol?

**Answer:**
JavaScript has a standard protocol for making objects iterable — usable with `for...of`, spread operator, destructuring, and other built-in iteration features.

**The Iterable Protocol:**
An object is iterable if it has a `[Symbol.iterator]()` method that returns an **iterator** — an object with a `next()` method.

```javascript
// Iterator object
const iterator = {
  current: 1,
  last: 5,
  
  next() {
    if (this.current <= this.last) {
      return { value: this.current++, done: false };
    }
    return { value: undefined, done: true };
  }
};

// Manually using an iterator
iterator.next(); // { value: 1, done: false }
iterator.next(); // { value: 2, done: false }
// ...
iterator.next(); // { value: 5, done: false }
iterator.next(); // { value: undefined, done: true }

// Iterable: has [Symbol.iterator] returning an iterator
const range = {
  from: 1,
  to: 5,
  
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      }
    };
  }
};

// Now range is iterable!
for (const n of range) console.log(n); // 1, 2, 3, 4, 5
const arr = [...range];                // [1, 2, 3, 4, 5]
const [first, second] = range;         // first = 1, second = 2
```

**Built-in iterables:**
```javascript
// Arrays, strings, Maps, Sets, generators, NodeLists
for (const char of 'hello') console.log(char);
for (const [key, val] of new Map([['a', 1], ['b', 2]])) console.log(key, val);
for (const item of new Set([1, 1, 2, 3, 3])) console.log(item); // 1, 2, 3
```

**Async iterables (ES2018):**
```javascript
const asyncRange = {
  async *[Symbol.asyncIterator]() {
    for (let i = 1; i <= 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      yield i;
    }
  }
};

for await (const n of asyncRange) {
  console.log(n); // 1, 2, 3, 4, 5 (with delays)
}

// Async generators for paginated API:
async function* fetchPages(url) {
  let page = 1;
  while (true) {
    const response = await fetch(`${url}?page=${page}`);
    const data = await response.json();
    if (data.items.length === 0) return;
    yield data.items;
    page++;
  }
}

for await (const items of fetchPages('/api/products')) {
  processItems(items);
}
```

**Difficulty:** Advanced

**Real-World Scenario:**
A Node.js data processing service reads large CSV files using Node.js Streams, which implement the async iterable protocol. Using `for await...of` over the stream reads the file in chunks without loading it entirely into memory, enabling processing of 10 GB files in a Node.js server with only 50 MB of memory usage.

**Follow-Up Questions:**
- What is the difference between an iterable and an iterator?
- How does `for await...of` work with async generators?
- How would you make a linked list data structure iterable in JavaScript?

---

### Q123. What are JavaScript Decorators (Stage 3)?

**Answer:**
Decorators are a metaprogramming syntax for annotating or modifying classes and their members. As of 2024, they reached Stage 3 in the TC39 process and are available in TypeScript, Babel, and some environments.

```javascript
// Class decorator
function logged(Class) {
  return class extends Class {
    constructor(...args) {
      console.log(`Creating ${Class.name}`);
      super(...args);
    }
  };
}

// Method decorator
function readonly(target, context) {
  if (context.kind === 'method') {
    return function(...args) {
      Object.freeze(this);
      return target.apply(this, args);
    };
  }
}

function validate(target, context) {
  return function(value) {
    if (value === null || value === undefined) {
      throw new Error(`${context.name}: value cannot be null`);
    }
    return target.call(this, value);
  };
}

// Field decorator
function required(target, context) {
  return function(initialValue) {
    if (initialValue === undefined) {
      throw new Error(`${context.name} is required`);
    }
    return initialValue;
  };
}

@logged
class UserService {
  #users = new Map();
  
  @validate
  getUserById(id) {
    return this.#users.get(id);
  }
  
  @readonly
  getAdminUsers() {
    return Array.from(this.#users.values()).filter(u => u.role === 'admin');
  }
}

// TypeScript/NestJS common usage:
@Controller('/users')
@UseGuards(AuthGuard)
class UserController {
  @Get('/:id')
  @Roles('admin', 'user')
  async getUser(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}
```

**Common decorator use cases:**

1. **Logging/Monitoring**: Log method calls automatically.
2. **Validation**: Validate inputs before function runs.
3. **Caching**: Memoize method results.
4. **Authorization**: Check permissions before method execution.
5. **Dependency Injection**: Used in Angular, NestJS, TypeDI.

```javascript
// Memoize decorator
function memoize(target, context) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = target.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

class MathService {
  @memoize
  fibonacci(n) {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }
}
```

**Difficulty:** Expert

**Real-World Scenario:**
A NestJS API (Node.js + TypeScript) uses decorators extensively: `@Injectable()` for dependency injection, `@Get()/@Post()` for routing, `@UseGuards(JwtAuthGuard)` for authentication, `@Roles('admin')` for authorization, and `@Body()/@Param()` for request parsing. These decorators (inspired by Angular's use of decorators) make the codebase declarative and reduce boilerplate significantly.

**Follow-Up Questions:**
- What is the difference between Stage 3 TC39 decorators and TypeScript's `experimentalDecorators`?
- How do decorators enable Dependency Injection in frameworks like NestJS?
- What are the performance implications of using decorators for method interception?

---

### Q124. What is the Nullish Coalescing Assignment and Logical Assignment operators?

**Answer:**
ES2021 introduced three logical assignment operators that combine logical operators with assignment:

```javascript
// ??= Nullish coalescing assignment
// Assigns only if the left side is null or undefined
let config = null;
config ??= { theme: 'dark', lang: 'en' };
// config = { theme: 'dark', lang: 'en' }

let userPrefs = { theme: 'light' };
userPrefs.lang ??= 'en'; // Assigns 'en' (lang is undefined)
userPrefs.theme ??= 'dark'; // Does NOT assign (theme is 'light', not null/undefined)
// userPrefs = { theme: 'light', lang: 'en' }

// ||= Logical OR assignment
// Assigns only if the left side is falsy (0, '', false, null, undefined)
let count = 0;
count ||= 10; // count = 10 (0 is falsy!)

let name = '';
name ||= 'Anonymous'; // 'Anonymous' (empty string is falsy)

let active = false;
active ||= true; // true (false is falsy)

// Compare with ??=
count ??= 10; // count = 0 (0 is NOT null/undefined, so no assignment)

// &&= Logical AND assignment
// Assigns only if the left side is truthy
let user = { name: 'Alice', isAdmin: false };
user &&= { ...user, lastSeen: Date.now() }; // Assigns (user is truthy)

let nullUser = null;
nullUser &&= { name: 'Default' }; // Does NOT assign (null is falsy)
// nullUser is still null
```

**Real-world patterns:**
```javascript
// Initialize object properties with defaults
function createConfig(overrides) {
  const config = {};
  config.timeout ??= 5000;
  config.retries ??= 3;
  config.baseUrl ??= 'https://api.example.com';
  return { ...config, ...overrides };
}

// React state pattern
const [state, dispatch] = useReducer(reducer, {});

function reducer(state, action) {
  return {
    ...state,
    [action.key]: state[action.key] ?? action.defaultValue
  };
}

// Memoized computation
class Cache {
  #store = {};
  
  get(key, computeFn) {
    this.#store[key] ??= computeFn(); // Compute only if not cached
    return this.#store[key];
  }
}
```

**Difficulty:** Intermediate

**Real-World Scenario:**
A React configuration system uses `??=` to set default values for optional plugin configurations. When a plugin doesn't specify its settings, `??=` assigns sensible defaults without overwriting explicitly configured values (even if they're `false` or `0`). This is more correct than `||=` which would incorrectly override legitimate falsy values like `timeout: 0` (meaning "no timeout").

**Follow-Up Questions:**
- What is the critical difference between `??=` and `||=`?
- How would you use these operators to implement lazy initialization?
- How do the logical assignment operators compare to using ternary operators?

---

### Q125. What is the `structuredClone()` function in JavaScript?

**Answer:**
`structuredClone()` (available in Node.js 17+ and all modern browsers) creates a **deep clone** of an object using the Structured Clone Algorithm.

```javascript
// Problem with shallow copying
const original = {
  name: 'Alice',
  address: { city: 'NYC', zip: '10001' },
  hobbies: ['reading', 'coding']
};

// Shallow copy - nested objects share reference
const shallow = { ...original };
shallow.address.city = 'LA'; // Mutates original.address.city too!
console.log(original.address.city); // 'LA' 💥

// structuredClone - true deep clone
const deep = structuredClone(original);
deep.address.city = 'Chicago';
console.log(original.address.city); // 'NYC' ✅ Unchanged

// Works with complex types
const complex = {
  date: new Date('2026-01-01'),
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3]),
  regex: /hello/gi,
  typed: new Uint8Array([1, 2, 3]),
  nested: { deeply: { nested: { data: [1, 2, 3] } } }
};

const cloned = structuredClone(complex);
console.log(cloned.date instanceof Date); // true
console.log(cloned.map instanceof Map);   // true
console.log(cloned.set instanceof Set);   // true

// Transferable objects (move ownership, more efficient)
const buffer = new ArrayBuffer(1024);
const transferred = structuredClone(buffer, { transfer: [buffer] });
// buffer is now detached (transferred), transferred is a clone
```

**What structuredClone CANNOT clone:**
```javascript
// ❌ Throws DataCloneError
structuredClone(() => {}); // Functions
structuredClone(document.querySelector('div')); // DOM nodes
structuredClone(new Promise(() => {})); // Promises
structuredClone(Symbol('id')); // Symbols (but non-symbol keys of objects work)
structuredClone(new Error('msg')); // Errors (in some environments)
```

**Alternatives and when to use each:**
```javascript
// JSON clone - loses Date, undefined, Symbol, functions
const jsonClone = JSON.parse(JSON.stringify(obj));

// structuredClone - best general-purpose deep clone
const clone = structuredClone(obj);

// Lodash cloneDeep - handles functions (sort of), wider browser support
import { cloneDeep } from 'lodash';
const lodashClone = cloneDeep(obj);

// Immer - immutable state updates (common in Redux Toolkit)
import produce from 'immer';
const nextState = produce(state, draft => {
  draft.user.name = 'Bob'; // Mutate the draft (Immer handles cloning)
});
```

**Difficulty:** Intermediate

**Real-World Scenario:**
A Redux reducer was accidentally mutating the previous state because of shallow copying: `return { ...state, users: state.users }` — modifying a user in the returned array was still affecting the original. Using `structuredClone(state)` at the start of the reducer (or better, using Redux Toolkit's Immer integration) prevents all accidental mutations in a complex state tree with deeply nested objects.

**Follow-Up Questions:**
- What are the limitations of using `JSON.parse(JSON.stringify())` for deep cloning?
- How does Immer work under the hood to provide immutable state updates?
- When would you prefer `structuredClone` over Lodash's `_.cloneDeep`?

---

### Q126. What is `Object.defineProperty` and how does it enable getter/setter patterns?

**Answer:**
`Object.defineProperty` allows you to define or modify a property with fine-grained control over its behavior through a **property descriptor**.

```javascript
const obj = {};

// Data descriptor
Object.defineProperty(obj, 'name', {
  value: 'Alice',
  writable: false,    // Cannot reassign
  enumerable: true,   // Shows in for...in, Object.keys()
  configurable: false // Cannot redefine or delete
});

obj.name = 'Bob'; // Silent failure (or TypeError in strict mode)
console.log(obj.name); // 'Alice'
delete obj.name;  // false - cannot delete

// Accessor descriptor (getter/setter)
let _age = 25;
Object.defineProperty(obj, 'age', {
  get() { return _age; },
  set(value) {
    if (typeof value !== 'number' || value < 0) {
      throw new TypeError('Age must be a positive number');
    }
    _age = value;
  },
  enumerable: true,
  configurable: true
});

obj.age;        // 25 (calls getter)
obj.age = 30;   // Calls setter
obj.age = -1;   // Throws TypeError

// Getters and setters in class syntax (cleaner):
class Temperature {
  constructor(celsius) {
    this._celsius = celsius;
  }
  
  get fahrenheit() {
    return this._celsius * 9/5 + 32;
  }
  
  set fahrenheit(value) {
    this._celsius = (value - 32) * 5/9;
  }
  
  get celsius() { return this._celsius; }
  set celsius(value) { this._celsius = value; }
}

const temp = new Temperature(100);
console.log(temp.fahrenheit); // 212
temp.fahrenheit = 32;
console.log(temp.celsius);    // 0
```

**`Object.defineProperties` — define multiple:**
```javascript
Object.defineProperties(obj, {
  firstName: { value: 'Alice', writable: true, enumerable: true },
  lastName:  { value: 'Smith', writable: true, enumerable: true },
  fullName: {
    get() { return `${this.firstName} ${this.lastName}`; },
    enumerable: true
  }
});
```

**Checking descriptors:**
```javascript
Object.getOwnPropertyDescriptor(obj, 'name');
// { value: 'Alice', writable: false, enumerable: true, configurable: false }

Object.getOwnPropertyDescriptors(obj); // All descriptors
```

**Creating immutable objects:**
```javascript
const CONSTANTS = Object.defineProperties({}, {
  MAX_RETRIES: { value: 3, writable: false, enumerable: true },
  BASE_URL:    { value: 'https://api.example.com', writable: false, enumerable: true }
});

// Or: Object.freeze() for quick immutability (shallow)
const frozen = Object.freeze({ name: 'Alice', scores: [1, 2, 3] });
frozen.name = 'Bob'; // Silently fails
frozen.scores.push(4); // ✅ This still works (freeze is shallow!)
```

**Difficulty:** Advanced

**Real-World Scenario:**
Vue 2's reactivity system used `Object.defineProperty` to intercept all property access and mutations on reactive data objects. Every property was replaced with a getter (for dependency tracking) and setter (for triggering updates). Vue 3 switched to Proxy for better coverage (detecting new properties, array index changes, and delete operations that `Object.defineProperty` couldn't intercept).

**Follow-Up Questions:**
- Why did Vue 2 have issues with dynamically added properties and how did Vue.set() solve this?
- What is the difference between `writable: false` and `configurable: false` in a property descriptor?
- How does `Object.freeze()` differ from using `Object.defineProperty` with `writable: false`?

---

### Q127. What are JavaScript Tagged Template Literals?

**Answer:**
Tagged template literals allow you to parse template literals with a custom function, giving control over how the template is processed.

**Syntax:**
```javascript
// tag function receives template parts and interpolated values
function tag(strings, ...values) {
  // strings: array of string parts
  // values: interpolated expressions
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] !== undefined ? values[i] : '');
  }, '');
}

const name = 'Alice';
const age = 25;
const result = tag`Hello, ${name}! You are ${age} years old.`;
// strings: ['Hello, ', '! You are ', ' years old.']
// values:  ['Alice', 25]
```

**Real-world use cases:**

**1. styled-components (CSS-in-JS):**
```javascript
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.primary ? '#2563eb' : 'transparent'};
  color: ${props => props.primary ? 'white' : '#2563eb'};
  padding: 8px 16px;
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

<Button primary>Save</Button>
<Button>Cancel</Button>
```

**2. SQL query building (sql-template-strings):**
```javascript
import sql from 'sql-template-strings';

const userId = 42; // Could be user input - safe!
const query = sql`SELECT * FROM users WHERE id = ${userId}`;
// Generates parameterized query - SQL injection safe!
// query.text:   'SELECT * FROM users WHERE id = $1'
// query.values: [42]

await client.query(query);
```

**3. HTML escaping:**
```javascript
function safeHtml(strings, ...values) {
  const escape = str => String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] !== undefined ? escape(values[i]) : '');
  }, '');
}

const userInput = '<script>alert("xss")</script>';
const html = safeHtml`<p>User said: ${userInput}</p>`;
// <p>User said: &lt;script&gt;alert("xss")&lt;/script&gt;</p>
```

**4. GraphQL queries (graphql-tag):**
```javascript
import gql from 'graphql-tag';

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      posts { title }
    }
  }
`;
```

**5. Internationalization:**
```javascript
function i18n(strings, ...values) {
  const template = strings.join('%s');
  return t(template, ...values); // Look up translation
}

i18n`Welcome, ${userName}!`;
// → "Bienvenue, Alice!" (in French locale)
```

**Difficulty:** Advanced

**Real-World Scenario:**
styled-components, one of the most popular React styling libraries with 40M+ weekly npm downloads, is built entirely on tagged template literals. The tag function receives CSS with embedded JavaScript expressions, processes them, and generates unique class names. This enables component-scoped CSS with full JavaScript power (theme access, props-based dynamic styles) with no build step required.

**Follow-Up Questions:**
- How does `String.raw` tagged template work and when would you use it?
- How do tagged templates prevent SQL injection vulnerabilities?
- What performance considerations exist for libraries like styled-components that use tagged templates at render time?

---

### Q128. What is `Promise.allSettled` vs `Promise.all` vs `Promise.any` vs `Promise.race`?

**Answer:**
These four Promise combinators handle groups of concurrent promises with different behaviors for success/failure:

```javascript
const p1 = Promise.resolve('Success 1');
const p2 = Promise.reject(new Error('Failed'));
const p3 = new Promise(resolve => setTimeout(() => resolve('Success 3'), 100));
const p4 = new Promise(resolve => setTimeout(() => resolve('Success 4'), 200));

// Promise.all - ALL must resolve; fails fast on first rejection
try {
  const [r1, r2, r3] = await Promise.all([p1, p2, p3]);
  // Never reached - p2 rejected
} catch (err) {
  console.error(err.message); // 'Failed' - immediately on p2 rejection
}

// Use when: ALL results are needed and ANY failure should stop everything
const [user, settings, permissions] = await Promise.all([
  fetchUser(id),
  fetchSettings(id),
  fetchPermissions(id)
]);

// Promise.allSettled - ALL complete (regardless of success/failure)
const results = await Promise.allSettled([p1, p2, p3]);
results.forEach(result => {
  if (result.status === 'fulfilled') {
    console.log('Value:', result.value);
  } else {
    console.log('Reason:', result.reason);
  }
});
// [
//   { status: 'fulfilled', value: 'Success 1' },
//   { status: 'rejected',  reason: Error('Failed') },
//   { status: 'fulfilled', value: 'Success 3' }
// ]

// Use when: you want ALL results even if some fail
const bulkResults = await Promise.allSettled(emails.map(sendEmail));
const sent = bulkResults.filter(r => r.status === 'fulfilled').length;
const failed = bulkResults.filter(r => r.status === 'rejected').length;

// Promise.any - FIRST fulfilled (ignores rejections)
const fastest = await Promise.any([
  fetch('https://api1.example.com/data'),
  fetch('https://api2.example.com/data'),
  fetch('https://api3.example.com/data')
]);
// Resolves with whichever API responds first successfully
// Rejects with AggregateError only if ALL reject

// Promise.race - FIRST settled (fulfilled OR rejected)
const timeoutPromise = new Promise((_, reject) => 
  setTimeout(() => reject(new Error('Timeout')), 5000)
);

try {
  const result = await Promise.race([
    fetchData('/api/data'),
    timeoutPromise
  ]);
} catch (err) {
  if (err.message === 'Timeout') {
    console.error('Request timed out');
  }
}
```

**Summary:**

| Method | Resolves when | Rejects when |
|---|---|---|
| `Promise.all` | ALL fulfill | First rejection |
| `Promise.allSettled` | ALL settle | Never rejects |
| `Promise.any` | First fulfillment | ALL reject (AggregateError) |
| `Promise.race` | First settles (either) | First settlement is rejection |

**Difficulty:** Intermediate

**Real-World Scenario:**
A React dashboard page loads user data, account settings, and recent notifications in parallel. `Promise.all` is used — if any request fails, the whole page shows an error (all data is required). However, the notifications panel uses `Promise.allSettled` separately, where failure to load notifications shouldn't block showing the main dashboard content.

**Follow-Up Questions:**
- What is `AggregateError` and when is it thrown?
- How would you implement a promise timeout pattern using `Promise.race`?
- When would you choose `Promise.any` over `Promise.race` for loading from multiple CDN endpoints?

---

### Q129. What are JavaScript Private Class Fields and Methods?

**Answer:**
Private class fields (ES2022, using `#` prefix) provide true encapsulation in JavaScript classes — not accessible outside the class, even in subclasses.

```javascript
class BankAccount {
  // Private fields - ONLY accessible within this class
  #balance;
  #transactionHistory = [];
  #accountNumber;
  
  // Private method
  #validateAmount(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      throw new TypeError('Amount must be a positive number');
    }
  }
  
  // Private static field
  static #instanceCount = 0;
  
  // Public field
  owner;
  
  constructor(owner, initialBalance) {
    this.owner = owner;
    this.#balance = initialBalance;
    this.#accountNumber = Math.random().toString(36).substr(2, 9).toUpperCase();
    BankAccount.#instanceCount++;
  }
  
  // Public methods - expose controlled access
  deposit(amount) {
    this.#validateAmount(amount); // Call private method
    this.#balance += amount;
    this.#transactionHistory.push({ type: 'deposit', amount, date: new Date() });
    return this.#balance;
  }
  
  withdraw(amount) {
    this.#validateAmount(amount);
    if (amount > this.#balance) throw new Error('Insufficient funds');
    this.#balance -= amount;
    this.#transactionHistory.push({ type: 'withdrawal', amount, date: new Date() });
    return this.#balance;
  }
  
  get balance() { return this.#balance; }
  get accountNumber() { return this.#accountNumber; }
  
  static getInstanceCount() { return BankAccount.#instanceCount; }
}

const account = new BankAccount('Alice', 1000);
account.deposit(500);
console.log(account.balance);        // 1500
console.log(account.#balance);       // SyntaxError: Private field!
console.log(account['#balance']);    // undefined - can't bypass with bracket notation

// Checking if private field exists
console.log(#balance in account);    // true (inside class context only)
```

**vs WeakMap pattern (pre-ES2022):**
```javascript
// Old: private via WeakMap
const _balance = new WeakMap();

class BankAccount {
  constructor(balance) {
    _balance.set(this, balance);
  }
  get balance() { return _balance.get(this); }
}

// New: private fields (cleaner, better performance)
class BankAccount {
  #balance;
  constructor(balance) { this.#balance = balance; }
  get balance() { return this.#balance; }
}
```

**Private fields in subclasses:**
```javascript
class SavingsAccount extends BankAccount {
  #interestRate;
  
  constructor(owner, balance, rate) {
    super(owner, balance);
    this.#interestRate = rate;
  }
  
  applyInterest() {
    // Cannot access parent's #balance!
    // Must use public getter
    const interest = this.balance * this.#interestRate;
    this.deposit(interest);
  }
}
```

**Difficulty:** Intermediate

**Real-World Scenario:**
A payment processing library in Node.js uses private fields to store API credentials and customer payment methods. Before private fields, the credit card data was stored in a WeakMap or convention-prefixed (`_cardNumber`), which could still be accessed by malicious code or accidentally logged. Private `#cardNumber` and `#cvv` fields are completely inaccessible outside the class, preventing accidental exposure in debugging tools, logs, or error stack traces.

**Follow-Up Questions:**
- Why can't private fields be accessed even in subclasses?
- How do private fields differ from TypeScript's `private` keyword?
- What is the `#field in object` check and when would you use it?

---

### Q130. What is the `Intl` API and how does it handle internationalization?

**Answer:**
The `Intl` (Internationalization) API provides locale-sensitive formatting for dates, numbers, currencies, and comparisons — built into the JavaScript runtime.

```javascript
// Intl.NumberFormat - numbers and currencies
const number = 1234567.89;

new Intl.NumberFormat('en-US').format(number);
// '1,234,567.89'

new Intl.NumberFormat('de-DE').format(number);
// '1.234.567,89'

new Intl.NumberFormat('en-IN').format(number);
// '12,34,567.89'

// Currency formatting
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});
formatter.format(29.99); // '$29.99'
formatter.format(1000);  // '$1,000.00'

// Indian Rupees in Hindi
new Intl.NumberFormat('hi-IN', { style: 'currency', currency: 'INR' })
  .format(50000);
// '₹50,000.00'

// Compact notation
new Intl.NumberFormat('en-US', { notation: 'compact' }).format(1500000);
// '1.5M'
```

```javascript
// Intl.DateTimeFormat - dates and times
const date = new Date('2026-06-15T14:30:00');

new Intl.DateTimeFormat('en-US').format(date);
// '6/15/2026'

new Intl.DateTimeFormat('en-GB').format(date);
// '15/06/2026'

new Intl.DateTimeFormat('en-US', {
  year: 'numeric', month: 'long', day: 'numeric',
  hour: '2-digit', minute: '2-digit', timeZone: 'America/New_York'
}).format(date);
// 'June 15, 2026 at 10:30 AM'

// Relative time
new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  .format(-3, 'day');  // '3 days ago'
  .format(1, 'week');  // 'next week'
  .format(-1, 'day');  // 'yesterday'
```

```javascript
// Intl.Collator - locale-aware string comparison / sorting
const words = ['café', 'cab', 'Cable', 'Cabaret'];

// Default sort (Unicode code points - incorrect for many locales)
words.sort();
// ['Cable', 'Cabaret', 'cab', 'café'] ❌

// Locale-aware sort
words.sort(new Intl.Collator('en', { sensitivity: 'base' }).compare);
// ['cab', 'Cabaret', 'Cable', 'café'] ✅

// Intl.PluralRules - correct pluralization
const pr = new Intl.PluralRules('en-US');
pr.select(0);  // 'other' → '0 items'
pr.select(1);  // 'one'   → '1 item'
pr.select(2);  // 'other' → '2 items'

// Arabic has 6 plural forms
const prAr = new Intl.PluralRules('ar');
prAr.select(0);   // 'zero'
prAr.select(1);   // 'one'
prAr.select(2);   // 'two'
prAr.select(5);   // 'few'
prAr.select(11);  // 'many'
prAr.select(100); // 'other'
```

**In a React i18n context:**
```jsx
// Custom hook for formatting
function useNumberFormat(locale = 'en-US') {
  const formatCurrency = useCallback((amount, currency = 'USD') => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency })
      .format(amount);
  }, [locale]);
  
  const formatDate = useCallback((date, options = {}) => {
    return new Intl.DateTimeFormat(locale, options).format(date);
  }, [locale]);
  
  return { formatCurrency, formatDate };
}
```

**Difficulty:** Intermediate

**Real-World Scenario:**
An e-commerce platform serving 50+ countries uses `Intl.NumberFormat` for consistent price formatting and `Intl.DateTimeFormat` for delivery dates. Without the Intl API, they previously maintained manual formatting libraries. Switching to the built-in API eliminated inconsistencies (e.g., "3.99€" becoming "€3.99" in France) and automatically supports new locales without code changes.

**Follow-Up Questions:**
- How would you use `Intl.RelativeTimeFormat` to display "2 hours ago" type timestamps in a React feed?
- What is the difference between locale `'en-US'`, `'en-GB'`, and `'en-IN'` in number formatting?
- How would you combine the Intl API with react-i18next for a complete internationalization solution?

---

## DOM & Browser APIs

### Q141. What is the Intersection Observer API?

**Answer:**
The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or the viewport. It's the correct way to implement lazy loading, infinite scroll, and scroll animations.

```javascript
// Basic usage
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Element is visible
        console.log(`${entry.target.id} is ${entry.intersectionRatio * 100}% visible`);
      }
    });
  },
  {
    root: null,           // null = viewport
    rootMargin: '0px',    // Expand/shrink root's bounding box
    threshold: 0.1        // 10% visibility triggers callback (or array: [0, 0.5, 1])
  }
);

// Observe elements
const target = document.querySelector('#lazy-image');
observer.observe(target);

// Unobserve
observer.unobserve(target);
observer.disconnect(); // Disconnect all observations
```

**Lazy loading images:**
```jsx
function LazyImage({ src, alt, placeholder }) {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Load once, stop observing
        }
      },
      { rootMargin: '200px' } // Start loading 200px before viewport
    );
    
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <img
      ref={imgRef}
      src={isVisible ? src : placeholder || 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='}
      alt={alt}
      loading="lazy" // Browser-native lazy loading as fallback
    />
  );
}
```

**Infinite scroll:**
```jsx
function InfiniteList({ fetchMore, hasMore }) {
  const [items, setItems] = useState([]);
  const loaderRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          const newItems = await fetchMore();
          setItems(prev => [...
Claude couldn't finish this response. Try again in a moment.