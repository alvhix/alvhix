---
title: 'Dependency inversion in Apex'
description: 'The fifth of the SOLID principles'
pubDate: 'Nov 10 2023'
updatedDate: 'May 19 2024'
heroImage: '/images/blog-placeholder-1.jpg'
draft: false
tags:
  - 'apex'
  - 'architecture'
  - 'layered'
  - 'good-practices'
---

# Basics

Dependency inversion is the fifth of the SOLI**D** principles. It promotes a loose coupling between components making our system more flexible and testable. It is considered one of the most important principles in architecture levels.

> A high level module should not depend on a low level module. Both should depend on abstractions.

The way of implementing this principle is by the dependency injection technique which it consists on extracting all the dependencies to be injected from outside the class via:

- Constructor
- Setter
- Public attribute

In dependency injection there are four roles:

- Low level module: the service class
- High level module: the client class that uses the service class
- Interface: implemented by the low level module and expected by the high level module
- Dependency injector framework: Maps and injects the dependencies at run time.

This is the normal way of applying dependency injection in any other programming language, however, we are going to apply it a bit different as Apex gives very little support to [reflection](https://en.wikipedia.org/wiki/Reflective_programming).

# Dependency injection in Apex

In Apex, the support for reflection is given by the [Type](https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/apex_methods_system_type.htm) class. The method `newInstance()` allows to instantiate a new class calling directly the empty constructor. Note that it's not possible to pass any parameter to the constructor. Here you may be answering, how are we going to apply dependency injection if we cannot pass any parameter to the constructor, and the answer is: adding more boilerplate code.

## Example

Let's start from a basic example:

### 1.- Low level module

The service class that we are going to use

```apex
public with sharing class AccountServiceImpl implements IAccountService {
    public Account get(String uuid) {
        List<Account> accs = [SELECT Id, Name, NumberOfEmployees FROM Account WHERE UUID__c = :uuid];
        Account account = accs.isEmpty() ? null : accs[0];

        if (account == null) {
            throw new AccountNotFoundException('Account with uuid ' + uuid + ' not found');
        }
        return account;
    }
}
```

### 2.- High level module

The high level module is the client class that will be making use of the low level module

```apex
@RestResource(urlMapping='/account/*')
global without sharing class AccountController {
    private static IAccountService accService = (IAccountService) Application.Service.newInstance(
        IAccountService.class
    );

    @HttpGet
    global static void getAccount() {
        String uuid = RestContext.request.requestURI.substring(
            RestContext.request.requestURI.lastIndexOf('/') + 1
        );
        try {
            ok(accService.get(uuid));
        } catch (AccountNotFoundException ex) {
            notFound(ex.getMessage());
        }
    }
}
```

### 3.- Interface

The interface that will be implemented by the low level module and expected by the high level module

```apex
public interface IAccountService {
    Account get(String uuid);
}
```

### 4.- Dependency injection framework

A dependency injector framework. In Apex we have some options like:

- [FFLIB commons](https://github.com/apex-enterprise-patterns/fflib-apex-common/blob/master/sfdx-source/apex-common/main/classes/fflib_Application.cls)
- [Force DI](https://github.com/apex-enterprise-patterns/force-di)
- Build your own dependency injector framework

A dependency injection framework usually consists on two parts:

1. A dependency container mapper which maps the interface with the implementation class

   ```apex
   public class Application {
       // Configure and create the ServiceFactory for this Application
       public static final fflib_Application.ServiceFactory Service = new fflib_Application.ServiceFactory(
           new Map<Type, Type>{ IAccountService.class => AccountService.class }
       );
   }
   ```

2. The injector itself, receives the interface and returns the implementation instance

   For the production code

   ```apex
   private static IAccountService accService = (IAccountService) Application.Service.newInstance(
           IAccountService.class
       );
   ```

   For the tests, we set the mock to replace the implementation class by another

   ```apex
   Application.Service.setMock(IAccountService.class, AccountServiceStub.class);
   ```

   At the end, by passing an interface to the dependency injection framework we will get the correct implementation.

   Note that now the implementation class and the interface are hardcoded in our Apex code, but it can be easily upgraded to rely on a Custom Metadata Type which gives the possibility to change dependencies at run-time directly in your SF org and use it as a Feature Flag.

   For example, imagine that you want to deploy a new version of your service class, you would deploy a second new version with a different class name set up the same mapping in the CMT and start using it. If you want to rollback to the previous version of your class it would be as easy as changing the implementation class in the CMT.

# Conclusions

In conclusion, this technique will make your code be more flexible and scalable in the long term. The potential of the idea behind flexibility is so huge, take advantadge of it.

| Pros                              | Cons                                                                     |
| --------------------------------- | ------------------------------------------------------------------------ |
| Loose coupling between components | More complexity due to the abstraction layer                             |
| Improve testability in unit tests | More prune to undetected runtime exceptions if not correctly unit tested |
| Use as a feature flag             |                                                                          |
