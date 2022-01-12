USE [master]
GO

IF DB_ID('inventarios') IS NOT NULL
  set noexec on  

CREATE DATABASE [inventarios];
GO