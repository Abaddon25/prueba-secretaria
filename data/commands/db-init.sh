sleep 30s

echo "running set up script"
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Operez2015 -d master -i db-init.sql