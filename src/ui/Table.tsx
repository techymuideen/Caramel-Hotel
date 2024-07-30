import { createContext, ReactNode, FC, useContext, ReactElement } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
  gap: 2rem;
`;

interface CommonRowProps {
  columns: string;
}

const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

interface TableContextType {
  columns: string;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

interface TableProps {
  columns: string;
  children: ReactNode;
}

const Table: FC<TableProps> & {
  Header: FC<{ children: ReactNode }>;
  Row: FC<{ children: ReactNode }>;
  Body: FC<{ data: any[]; render: (item: any) => ReactElement }>;
  Footer: FC<{ children: ReactNode }>;
} = ({ columns, children }) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
};

const Header: FC<{ children: ReactNode }> = ({ children }) => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Header must be used within a Table");
  }

  const { columns } = context;

  return (
    <StyledHeader columns={columns} as="header">
      {children}
    </StyledHeader>
  );
};

const Row: FC<{ children: ReactNode }> = ({ children }) => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Row must be used within a Table");
  }

  const { columns } = context;

  return <StyledRow columns={columns}>{children}</StyledRow>;
};

const Body: FC<{ data: any[]; render: (item: any) => ReactElement }> = ({
  data,
  render,
}) => {
  if (!data.length) return <Empty>No data found!</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
};

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
